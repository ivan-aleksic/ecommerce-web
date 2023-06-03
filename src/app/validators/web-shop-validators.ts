import { FormControl, ValidationErrors } from "@angular/forms";

export class WebShopValidators {

    // whitespace validation
    static notOnlyWhitespace(control: FormControl) : ValidationErrors {
        
        // check if string only contains whitespace
        // trim -> removes whitespace
        if ((control.value != null) && (control.value.trim().length === 0)) {

            // invalid, return error object
            // notOnlyWhitespace -> validation error key (The HTML template will check for this error key)
            return { 'notOnlyWhitespace': true };
        }
        else {
            // valid, return null
            return null;
        }
    }
}
