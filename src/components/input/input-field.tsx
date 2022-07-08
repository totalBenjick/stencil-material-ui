import { Component, h, Prop, State, Event, EventEmitter, Listen, Element } from '@stencil/core';

@Component({
  tag: 'miche-input-field',
  styleUrl: 'input-field.scss',
  shadow: true,
})
export class InputField {
  previousValue: string = '';
  @Element() el: Element;
  @Prop() name: string | null;
  @Prop() ariaLabel: string | null;
  @Prop() label: string | null;
  @Prop() type: string | null;
  @Prop() options: any[] | null;
  @Prop() idprop: string | null;
  @Prop() minlength: string | null;
  @Prop() maxlength: string | null;
  @Prop() regex: RegExp | null;
  @Prop() helperText: string | null;
  @State() value: string;
  @State() active: boolean;
  @State() error: boolean = false;
  @State() errorMessage: string = 'no pasa las validaciones';
  @Event({
    eventName: 'saveInput',
    bubbles: true,
    composed: true,
    cancelable: true,
  })
  saveInput: EventEmitter<Object>;

  componentWillLoad() {
    this.errorMessage = `${this.label} no pasa las validaciones`;
  }

  handleChange(e) {
    // in any change, the error will be assumed false and errorMessasge blank
    this.error = false;
    this.errorMessage = '';
    const {
      target: { value },
    } = e;
    this.value = value;
    if (this.regex) {
      let regexTest = this.regex.test(value);
      if (regexTest) {
        this.error = false;
        this.errorMessage = '';
      } else {
        this.error = true;
        this.errorMessage = `${this.label} no pasa las validaciones`;
        console.log(this.regex, 'regex', this.errorMessage);
      }
    }

    if (this.minlength) {
      if (this.value.length < parseInt(this.minlength)) {
        this.error = true;
        this.errorMessage = `${this.label} es demasiado corto`;
      }
    }

    if (this.maxlength) {
      if (this.value.length > parseInt(this.maxlength)) {
        this.error = true;
        this.errorMessage = `${this.label} no admite tantos caracteres`;
      }
    }

    if (this.type === 'tel') {
      let tenDigitValue = e.target.value.substring(0, 14);
      e.target.value = tenDigitValue;
      this.value = this.phoneMask(tenDigitValue);
    }

    if (this.type === 'select') {
      this.active = true;
    }

    // build object and send it to the next upper level,
    let objectToSave = {
      id: this.name,
      input_id: this.idprop,
      value: this.value,
      error: this.error,
    };
    this.saveInput.emit(objectToSave);
  }

  preventBannedCharacters(e) {
    let bannedCharRegex;
    if (this.type === 'tel') {
      bannedCharRegex = /^\d+$/;
      let isCharacterOK = bannedCharRegex.test(e.key);
      if (!isCharacterOK) {
        e.preventDefault();
        return;
      }
    }
    return false;
  }

  phoneMask(phone: string) {
    return phone
      .replace(/\D/g, '')
      .replace(/^(\d)/, '($1')
      .replace(/^(\(\d{3})(\d)/, '$1) $2')
      .replace(/(\d{3})(\d{1,5})/, '$1-$2')
      .replace(/(-\d{5})\d+?$/, '$1');
  }
  handleFocus() {
    this.active = true;
  }

  handleBlur(e) {
    if (e.target.value === '') {
      this.error = false;
      this.errorMessage = '';
    }
    this.active = false;
    this.previousValue = e.target.value;
  }

  @Listen('eraseInput', { target: 'body' })
  onEraseInputValue() {
    this.value = '';
    if (this.type === 'select') {
      let selectItem = this.el.shadowRoot.querySelectorAll('.book-input')[0] as HTMLSelectElement;
      selectItem.selectedIndex = 0;
    }
  }

  renderItem() {
    console.log(this.active, 'active?');
    switch (this.type) {
      case 'text':
      case 'tel':
      case 'email':
        return [
          <div class="form-field__control">
            <label htmlfor={!!this.name && this.name} class={`form-field__label ${(this.active && 'active') || ''} ${(this.value && 'fill') || ''}`}>
              {!!this.label && this.label}
            </label>
            <input class={'book-input'} type={this.type} value={this.value} onInput={e => this.handleChange(e)} onFocus={() => this.handleFocus()} onBlur={e => this.handleBlur(e)} onKeyPress={e => this.preventBannedCharacters(e)} name={!!this.name && this.name} id={!!this.idprop && this.idprop} />
            {!!this.helperText && <span class="helper__text">{this.helperText}</span>}
            <span class={`form-field__error ${(this.error && 'has-error') || ''}`}>{`${this.errorMessage}`}</span>
          </div>,
        ];
      case 'select':
        return [
          <div class="form-field__control">
            <label htmlfor={!!this.name && this.name} class={`form-field__label ${(this.active && 'active') || ''} ${(this.value && 'fill') || ''}`}>
              {!!this.label && this.label}
            </label>
            <select class={'book-input select'} onChange={e => this.handleChange(e)} name={!!this.name && this.name} id={!!this.idprop && this.idprop}>
              {this.options.map(option => (
                <option value={option}>{option}</option>
              ))}
            </select>
            {!!this.helperText && <span class="helper__text">{this.helperText}</span>}
            <span class={`form-field__error ${(this.error && 'has-error') || ''}`}>{`${this.errorMessage}`}</span>
          </div>,
        ];
    }
  }

  render() {
    return [this.renderItem()];
  }
}
