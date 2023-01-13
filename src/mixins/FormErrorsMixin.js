function isDict(v) {
    return typeof v==='object' && v!==null && !(v instanceof Array) && !(v instanceof Date);
}

export default {
    data() {
        return {
            errors: {
                fields: {},
                non: []
            },
            scrolled: false,
        }
    },
    methods: {
        setNotScrolled: function () {
            this.scrolled = false;
        },
        setScrolled: function () {
            this.scrolled = true;
        },
        mapErrors: function (data) {
            // eslint-disable-next-line no-prototype-builtins
            if (data && data.hasOwnProperty('non_field_errors'))
                this.addNonFieldError(data['non_field_errors']);
            this.setNotScrolled();
            this.errors.fields = data;
        },
        hasError: function (field) {
            let result = this.getError(field) !== null;
            if (result && !this.scrolled) {
                if (this.$refs[field]) {
                    this.setScrolled();
                    let ref = this.$refs[field];
                    if (Array.isArray(this.$refs[field]))
                        ref = ref[0];
                    ref.$el.scrollIntoView();
                }
            }
            return result
        },
        getError: function (field, errors=undefined) {
            if(errors === undefined)
                errors = this.errors.fields
            for (let val in errors){
                if (isDict(errors[val])) {
                    if (field !== undefined && field !== null && field.includes('.')) {
                        return this.getError(field.split('.').slice(1).join('.'), errors[val]);
                    }
                }
                if((errors[val]).length > 0)
                    if(val === field)
                        return errors[val];
            }
            return null;
        },
        deleteError: function (field, id = undefined) {
            delete this.errors.fields[field];
            if (id !== undefined) {
                this.$delete(this.errors.fields[id], field);
                if (Object.keys(this.errors.fields[id]).length === 0) {
                    this.$delete(this.errors.fields, id);
                }
            } else {
                delete this.errors.fields[field];
            }
        },
        deleteNonFieldError: function (error) {
            let errors = this.errors.non;
            errors.splice(errors.indexOf(error), 1);
            this.$set(this.errors, 'non', errors);
        },
        addNonFieldError: function (error) {
            let errors = this.errors.non;
            if (errors.indexOf(error))
                errors.push(error);
            this.$set(this.errors, 'non', errors);
            // this.show_non_field_errors = true;
        },
        getNonFieldErrors: function () {
            return this.errors.non
        }
    }
}
