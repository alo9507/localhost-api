import { GraphQLExtension } from 'apollo-server';

class AnalyticsExtension implements GraphQLExtension {
  requestDidStart(data) {
    const { queryString, operationName, variables } = data;
    console.time('requestDidStart');

    if (operationName) {
      console.log('OPERATION');
      console.log(operationName);
    }

    console.log('QUERY');
    console.log(queryString.trim());

    console.log('VARIABLES');
    console.log(variables);

    return (...errors) => {
      if (errors.length) {
        console.log('ERRORS');
        console.log(JSON.stringify(errors, null, 2));
      }
      console.timeEnd('requestDidStart');
    };
  }

  parsingDidStart() {
    console.time('parsingDidStart');
    return () => console.timeEnd('parsingDidStart');
  }

  validationDidStart() {
    console.time('validationDidStart');
    return () => console.timeEnd('validationDidStart');
  }

  executionDidStart() {
    console.time('executionDidStart');
    return () => console.timeEnd('executionDidStart');
  }

  willSendResponse(options) {
    console.log('willSendResponse');
    console.log(JSON.stringify(options.graphqlResponse, null, 2));
  }
}

export default AnalyticsExtension;
