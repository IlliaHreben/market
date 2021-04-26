const LIVR = require('livr')
const extraRules = require('livr-extra-rules')
LIVR.Validator.defaultAutoTrim(true)

LIVR.Validator.registerAliasedDefaultRule({
  name: 'shortly_text',
  rules: ['string', { max_length: 90 }],
  error: 'WRONG_TEXT'
})

LIVR.Validator.registerAliasedDefaultRule({
  name: 'page_number',
  rules: ['not_empty', 'positive_integer', { default: 1 }],
  error: 'WRONG_PAGE'
})

LIVR.Validator.registerAliasedDefaultRule({
  name: 'page_size',
  rules: ['not_empty', { number_between: [10, 100] }, { default: 10 }],
  error: 'WRONG_PAGE_SIZE'
})

LIVR.Validator.registerAliasedDefaultRule({
  name: 'order',
  rules: ['trim', 'to_uc', { 'one_of': ['ASC', 'DESC'] }],
  error: 'WRONG_ORDER'
})

const defaultRules = {
  ...extraRules,
  'list_or_one'(rule) {
    return value => {
      if (value === undefined || value === null || value === '') return;
      const validator = new LIVR.Validator({
        value: {
          'or': [rule, { 'list_of': rule }]
        }
      });

      if (!validator.validate({ value })) {
        return validator.getErrors().value;
      }

      return;
    };
  },
  'to_array'() {
    return (value, params, outputArr) => {
      if (value === undefined || value === null || value === '') return;

      if (!Array.isArray(value)) {
        outputArr.push([value]);

        return;
      }

      return;
    };
  }
}

LIVR.Validator.registerDefaultRules(defaultRules)

module.exports = LIVR
