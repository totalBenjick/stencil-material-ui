/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface MicheForm {
        "isOnModal": boolean;
        "isOnPricingPage": boolean;
        "isOverlayVisible": boolean;
        "submitUrl": string;
        "variant": string;
    }
    interface MicheInputField {
        "ariaLabel": string | null;
        "helperText": string | null;
        "idprop": string | null;
        "label": string | null;
        "maxlength": string | null;
        "minlength": string | null;
        "name": string | null;
        "options": any[] | null;
        "regex": RegExp | null;
        "type": string | null;
    }
    interface MyComponent {
        /**
          * The first name
         */
        "first": string;
        /**
          * The last name
         */
        "last": string;
        /**
          * The middle name
         */
        "middle": string;
    }
}
export interface MicheFormCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLMicheFormElement;
}
export interface MicheInputFieldCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLMicheInputFieldElement;
}
declare global {
    interface HTMLMicheFormElement extends Components.MicheForm, HTMLStencilElement {
    }
    var HTMLMicheFormElement: {
        prototype: HTMLMicheFormElement;
        new (): HTMLMicheFormElement;
    };
    interface HTMLMicheInputFieldElement extends Components.MicheInputField, HTMLStencilElement {
    }
    var HTMLMicheInputFieldElement: {
        prototype: HTMLMicheInputFieldElement;
        new (): HTMLMicheInputFieldElement;
    };
    interface HTMLMyComponentElement extends Components.MyComponent, HTMLStencilElement {
    }
    var HTMLMyComponentElement: {
        prototype: HTMLMyComponentElement;
        new (): HTMLMyComponentElement;
    };
    interface HTMLElementTagNameMap {
        "miche-form": HTMLMicheFormElement;
        "miche-input-field": HTMLMicheInputFieldElement;
        "my-component": HTMLMyComponentElement;
    }
}
declare namespace LocalJSX {
    interface MicheForm {
        "isOnModal"?: boolean;
        "isOnPricingPage"?: boolean;
        "isOverlayVisible"?: boolean;
        "onCloseOverlay"?: (event: MicheFormCustomEvent<any>) => void;
        "onEraseInput"?: (event: MicheFormCustomEvent<Object>) => void;
        "onShowModal"?: (event: MicheFormCustomEvent<any>) => void;
        "onToggleOffSnackbar"?: (event: MicheFormCustomEvent<any>) => void;
        "submitUrl"?: string;
        "variant"?: string;
    }
    interface MicheInputField {
        "ariaLabel"?: string | null;
        "helperText"?: string | null;
        "idprop"?: string | null;
        "label"?: string | null;
        "maxlength"?: string | null;
        "minlength"?: string | null;
        "name"?: string | null;
        "onSaveInput"?: (event: MicheInputFieldCustomEvent<Object>) => void;
        "options"?: any[] | null;
        "regex"?: RegExp | null;
        "type"?: string | null;
    }
    interface MyComponent {
        /**
          * The first name
         */
        "first"?: string;
        /**
          * The last name
         */
        "last"?: string;
        /**
          * The middle name
         */
        "middle"?: string;
    }
    interface IntrinsicElements {
        "miche-form": MicheForm;
        "miche-input-field": MicheInputField;
        "my-component": MyComponent;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "miche-form": LocalJSX.MicheForm & JSXBase.HTMLAttributes<HTMLMicheFormElement>;
            "miche-input-field": LocalJSX.MicheInputField & JSXBase.HTMLAttributes<HTMLMicheInputFieldElement>;
            "my-component": LocalJSX.MyComponent & JSXBase.HTMLAttributes<HTMLMyComponentElement>;
        }
    }
}
