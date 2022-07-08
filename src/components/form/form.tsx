import { Component, h, Listen, Prop, State, Event, EventEmitter } from '@stencil/core';
import { SnackCaption, SnackStatus } from './form-definitions';
import { FIELDS } from './variants';
import { pick } from 'underscore';

@Component({
  tag: 'miche-form',
  styleUrl: 'form.scss',
  shadow: true,
})
export class Form {
  @Event({
    eventName: 'eraseInput',
    bubbles: true,
    composed: true,
    cancelable: true,
  })
  eraseInput: EventEmitter<Object>;
  @Event({
    eventName: 'closeOverlay',
    bubbles: true,
    composed: true,
    cancelable: true,
  })
  closeOverlay: EventEmitter<any>;
  @Event({
    eventName: 'showModal',
    bubbles: true,
    composed: true,
    cancelable: true,
  })
  showModal: EventEmitter<any>;
  @Event({
    eventName: 'toggleOffSnackbar',
    bubbles: true,
    composed: true,
    cancelable: true,
  })
  toggleOffSnackbar: EventEmitter<any>;

  @State() isSubmitDisabled: boolean = true;
  @State() isSnackVisible: boolean = false;
  @State() snackTag: string = SnackStatus.loading;
  @State() snackCaption: string = SnackCaption.loading;
  @State() state: Object = {};
  @Prop() isOnModal: boolean = false;
  @Prop() submitUrl: string = '';
  @Prop() isOverlayVisible = false;
  @Prop() variant: string = 'bookDemoForm';
  @Prop() isOnPricingPage: boolean = false;

  fields: any[] = [];
  formData: object = {};
  formName = '';

  componentWillLoad() {
    this.fields = FIELDS[this.variant];
    console.log(FIELDS, 'los fields chidos', this.variant, this.fields);
  }

  renderPills() {
    return this.fields.map(field => {
      return [<miche-input-field name={field.name} aria-label={field.ariaLabel} label={field.label} type={field.type} idprop={field.id} minlength={field.minlength} maxlength={field.maxlength} regex={field.regex} options={field.options || {}} helper-text={field.helperText || ''}></miche-input-field>];
    });
  }

  @Listen('saveInput', { target: 'body' })
  onInputChange(event: CustomEvent) {
    if (!event.detail.input_id.includes(this.formName)) return;
    this.state[event.detail.id] = event.detail;
    this.validateSubmit(this.state);
  }

  @Listen('toggleOffSnackbar', { target: 'body' })
  onToggleOffSnackbar() {
    this.isSnackVisible = false;
  }

  onToggleOnSnackbar() {
    if (this.isOnModal) {
      this.showModal.emit();
    }
    this.isSnackVisible = true;
  }

  getPayloadValues(variant) {
    let payload = {};
    for (const [key] of Object.entries(this.state)) {
      payload = { ...payload, [`${key}`]: this.state[key].value };
    }
    switch (variant) {
      case 'bookDemoForm':
        if (window.location.pathname.startsWith('/pricing')) return { ...payload, planTypeInterest: 'MAX' };
        return payload;
      case 'externalReferralForm':
        return {
          ...payload,
          interest: 'Product-SaaS',
        };
    }
  }

  validateSubmit(state: Object) {
    let countError = 0;
    let requiredCount = this.fields.filter(el => el.required === true);
    let requiredFieldList = requiredCount.map(el => el.name);
    let stateRequiredList = pick(this.state, ...requiredFieldList);
    for (let key in state) {
      if (state[key].error === true) {
        countError++;
      }
    }
    if (requiredFieldList.length === Object.keys(stateRequiredList).length && countError === 0) {
      this.isSubmitDisabled = false;
    } else {
      this.isSubmitDisabled = true;
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    this.post(e);
    this.handleReset();
  }

  handleReset() {
    this.eraseInput.emit();
    this.state = {};
    this.validateSubmit(this.state);
  }

  async post(e) {
    e.preventDefault();

    this.onToggleOnSnackbar();

    this.snackTag = SnackStatus.success;
    this.snackCaption = SnackCaption.success;
    if (this.isOnModal) {
      this.showModal.emit('success');
    }

    // this.snackTag = SnackStatus.error;
    // this.snackCaption = SnackCaption.error;
    // if (this.isOnModal) {
    //   this.showModal.emit("error");
    // }

    (() => {
      setTimeout(() => {
        this.onToggleOffSnackbar();
        this.snackTag = SnackStatus.loading;
        this.snackCaption = SnackCaption.loading;
        if (this.isOnModal) {
          this.toggleOffSnackbar.emit();
          this.showModal.emit('loading');
        }
      }, 10000);
    })();
  }

  renderBasicForm() {
    return [
      <div class={`wrapper ${(this.isOnModal && 'modal') || ''}`}>
        <form class="book-form" onSubmit={e => this.handleSubmit(e)}>
          {this.renderPills()}
          <button type="submit" class="form-button" disabled={this.isSubmitDisabled}>
            ENVIAR
          </button>
        </form>
      </div>,
    ];
  }

  renderForm() {
    switch (this.variant) {
      case 'bookDemoForm':
        if (this.isOnModal) {
          return [
            <div
              class={'wrapper__overlay ' + (this.isOverlayVisible ? 'visible' : '')}
              onClick={() => {
                this.closeOverlay.emit();
              }}
            >
              <div
                class="card"
                onClick={e => {
                  e.stopPropagation();
                }}
              >
                <div class="headerbox">
                  <span class="content_title"> Book a Free Demo</span>{' '}
                  <close-icon
                    class="close-icon"
                    onClick={() => {
                      this.closeOverlay.emit();
                    }}
                  ></close-icon>
                </div>
                {this.renderBasicForm()}
              </div>
            </div>,
          ];
        } else {
          return [...this.renderBasicForm(), <miche-snackbar is-visible={this.isSnackVisible} tag={this.snackTag} caption={this.snackCaption}></miche-snackbar>];
        }
    }
  }

  render() {
    return this.renderForm();
  }
}
