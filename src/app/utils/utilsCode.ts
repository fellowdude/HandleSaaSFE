
export class UtilsCode {
    static cleanString(cadena: string): string {
        const specialChars = "!@#$^&%*()+=-[]\/{}|:<>?,.";
        for (const char of specialChars) {
            cadena = cadena.replace(new RegExp("\\" + char, 'gi'), '');
        }
        cadena = cadena.toLowerCase();
        cadena = cadena.replace(/ /g, '_');
        cadena = cadena.replace(/á/gi, 'a');
        cadena = cadena.replace(/é/gi, 'e');
        cadena = cadena.replace(/í/gi, 'i');
        cadena = cadena.replace(/ó/gi, 'o');
        cadena = cadena.replace(/ú/gi, 'u');
        cadena = cadena.replace(/ñ/gi, 'n');
        cadena = cadena.replace(/,/gi, '_');
        cadena = cadena.replace(/\?/gi, '');
        cadena = cadena.replace(/&/gi, '_');
        cadena = cadena.replace(/=/gi, '_');
        cadena = cadena.replace(/\./gi, '_');
        cadena = cadena.replace(/\(/gi, '_');
        cadena = cadena.replace(/\)/gi, '');
        cadena = cadena.replace(/\//gi, '');
        cadena = cadena.replace(/\%/gi, '');
        return cadena;
    }

    static cleanStringOnPaste(cadena: string, pattern: any): string {
        const cadenaArr = [...cadena]; // convert into array
        for (let i = 0; i < cadenaArr.length; i++) {
            if (!pattern.test(cadenaArr[i])) {
                cadenaArr.splice(i, 1);
                i--;
            }
        }

        return cadenaArr.join('');
    }
    static cleanStringTable(cadena: string): string {
        const specialChars = "!#$^&%*()+=-[]\/{}|:<>?,";
        for (const char of specialChars) {
            cadena = cadena.replace(new RegExp("\\" + char, 'gi'), '');
        }
        cadena = cadena.toLowerCase();
        cadena = cadena.replace(/á/gi, 'a');
        cadena = cadena.replace(/é/gi, 'e');
        cadena = cadena.replace(/í/gi, 'i');
        cadena = cadena.replace(/ó/gi, 'o');
        cadena = cadena.replace(/ú/gi, 'u');
        cadena = cadena.replace(/ñ/gi, 'n');
        cadena = cadena.replace(/,/gi, '_');
        cadena = cadena.replace(/\?/gi, '');
        cadena = cadena.replace(/&/gi, '_');
        cadena = cadena.replace(/=/gi, '_');
        cadena = cadena.replace(/\(/gi, '_');
        cadena = cadena.replace(/\)/gi, '');
        cadena = cadena.replace(/\//gi, '');
        cadena = cadena.replace(/\%/gi, '');
        return cadena;
    }

    static urlValidAccess(entity: string, method: string, description?: string): boolean {
        let valid = false
        const urlAllowed = JSON.parse(atob(localStorage.getItem("urlAllowedGeneral")));
        const infoUrl = urlAllowed.find(item => item.name == entity)
        if (infoUrl) {
            let infoMethod = null
            if (description) {
                infoMethod = infoUrl.operations.find(item => item.method == method && item.description == description)
            } else {
                infoMethod = infoUrl.operations.find(item => item.method == method)
            }
            if (infoMethod) {
                valid = true
            }
        }
        return valid
    }

    static validatePhoneInput(event: KeyboardEvent) {
        const pattern = /^[0-9 +-]*$/;
        const inputChar = String.fromCharCode(event.charCode);

        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }
};