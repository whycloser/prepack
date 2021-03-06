var React = require('React');
// the JSX transform converts to React, so we need to add it back in
this['React'] = React;
var {createFragmentContainer} = require('RelayModern');

if (!this.__evaluatePureFunction) {
  this.__evaluatePureFunction = function(f) {
    return f();
  };
}

module.exports = this.__evaluatePureFunction(() => {

  function App(props) {
    return <div className={props.className}>uid: {props.id}</div>;
  }

  var Node = {
    kind: "Fragment",
    name: "Test_foo",
    type: "Foo",
    metadata: null,
    argumentDefinitions: [],
    selections: [
      {
        kind: "ScalarField",
        alias: null,
        name: "id",
        args: null,
        storageKey: null,
      },
    ],
  };

  var WrappedApp = createFragmentContainer(App, {
    foo: function foo() {
      return Node;
    },
  })

  if (this.__optimizeReactComponentTree) {
    __optimizeReactComponentTree(WrappedApp);
  }

  // this is a mocked out relay mock for this test
  class RelayMock extends React.Component {
    getChildContext() {
      return {
        relay: {
          environment: {
            ['@@RelayModernEnvironment']: true,
            check() {},
            lookup() {},
            retain() {},
            sendQuery() {},
            execute() {},
            subscribe() {},
            unstable_internal: {
              getFragment() {
                
              },
              createFragmentSpecResolver() {
                return {
                  resolve() {
                    return {
                      className: "fb-class",
                      title: "Hello world",
                    };
                  },
                  isLoading() {
                    return false;
                  },
                };
              }
            },
          },
          variables: {},
        },
      };
    }
    render() {
      return <WrappedApp />;
    }
  }

  RelayMock.childContextTypes = {
    relay: () => {},
  };  

  RelayMock.getTrials = function(renderer, Root) {
    renderer.update(<Root />);
    return [['fb7 mocks', renderer.toJSON()]];
  };

  return RelayMock;
});
