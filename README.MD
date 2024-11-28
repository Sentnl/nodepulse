
<div align="center">

# # NodePulse 
[![NPM Package](https://img.shields.io/badge/NPM_Package-Published-cc3534)](https://www.npmjs.com/package/@sentnl/nodepulse)


**Maintain and utilize a list of healthy nodes.**


[Get Started](#get-started)  | [Examples](examples) 

</div>


NodePulse is a lightweight JavaScript library designed to help developers maintain and utilize a list of healthy nodes (Currently it supports Hyperion and Atomic API nodes). The library connects to an Cloudflare Load Balanced API https://nodes.nodepulse.co/nodes (Which in turn connects to 3 backend APIs running on different cloud platforms) that provides a list of healthy nodes, which it regularly refreshes, and falls back to a predefined list of default nodes in case of not being able to contact any of the backends. 

✋ In the Future if more Guilds offer to run this backend service, we can configure cloudflare to automatically add/remove backends from the proxy pool.
✋ We can even configure multiple  Load Balanced API proxies, so we don't rely on cloudflare.

For now only the WAX network is supported.

## Features

- **GeoIP Integration**: Automatically connects you to geographically closest nodes
- **Real-time Node Discovery**: Dynamically finds and connects to available nodes
- **Fault Tolerance**: Maintains network integrity even if some nodes fail
- **Custom Default Nodes**: Allows overriding of default nodes for specific node types and networks
- **Network Supported**: WAX 

## Get-started


### Install the package

```bash
npm install @sentnl/nodepulse
```
### Basic Example

**Here’s an example of how to use NodePulse to retrieve a healthy node from the list:**

By Default it will provide you with 3 healthy Hyperion Mainnet nodes, to choose atomic and or testnet nodes you need to use custom options.

```js
import NodePulse from '@sentnl/nodepulse';

// Initialize NodePulse with default options
const nodePulse = new NodePulse();

// Retrieve the next healthy node in the list
const node = nodePulse.getNode();
console.log(`Using node: ${node}`);
```

### Custom Options

You can customize the behavior of NodePulse by passing an options object when creating an instance. Available options include:

- `nodeType`: Type of nodes to use ('hyperion' or 'atomic'). Default is 'hyperion'
- `network`: Network to use ('mainnet' or 'testnet'). Default is 'mainnet'
- `nodeCount`: Number of nodes to retrieve from the API. Default is 3
- `updateInterval`: How often (in milliseconds) to refresh the node list. Default is 30 seconds
- `apiUrl`: The API URL to fetch healthy nodes. Default is 'https://nodes.nodepulse.co/nodes'
- `defaultNodes`: Custom default nodes to use as fallback
- `historyfull`: (Hyperion only) Whether to return nodes with full history. Default is true
- `streamingEnabled`: (Hyperion only) Whether to return nodes with streaming enabled. Default is true
- `atomicassets`: (Atomic only) Whether to return nodes with atomicassets support. Default is true
- `atomicmarket`: (Atomic only) Whether to return nodes with atomicmarket support. Default is true
- `useQryHub`: Whether to use QryHub for fetching nodes. Default is false
- `qryHubApiUrl`: Custom QryHub API URL (optional, only used if `useQryHub` is true)
- `chainId`: The chain ID to use when fetching nodes from QryHub (required if `useQryHub` is true)

**Example of using custom options with default node override for Hyperion Mainnet:**

```js
import { NodePulse } from '@sentnl/nodepulse';

const customDefaultNodes = {
  hyperion: {
    mainnet: [
      'https://wax.eosrio.io',
      'https://api.waxsweden.org',
      'https://wax.eu.eosamsterdam.net'
    ]
  }
};

// Initialize with custom options and default nodes
const nodePulse = new NodePulse({
  nodeType: 'hyperion',
  network: 'mainnet',
  nodeCount: 5,
  updateInterval: 60000, // Refresh every minute
  apiUrl: 'https://nodes.nodepulse.co/nodes',
  defaultNodes: customDefaultNodes,
  historyfull: false,
  streamingEnabled: false
});

// Retrieve a node from the custom configuration
const node = nodePulse.getNode();
console.log(`Using node: ${node}`);
```

**Example of using custom options with default node override for Atomic Mainnet:**

```js
import { NodePulse } from '@sentnl/nodepulse';

// Initialize with custom options and default nodes
const nodePulse = new NodePulse({
  nodeType: 'atomic',
  network: 'mainnet',
  nodeCount: 5,
  updateInterval: 60000, // Refresh every minute
  apiUrl: 'https://nodes.nodepulse.co/nodes',
  atomicassets: false,
  atomicmarket: false
});

// Retrieve a node from the custom configuration
const node = nodePulse.getNode();
console.log(`Using node: ${node}`);
```

**Example of using QryHub to fetch Hyperion nodes for the Jungle testnet:**

```js
import { NodePulse } from '@sentnl/nodepulse';

const nodePulse = new NodePulse({
  useQryHub: true,
  chainId: '73e4385a2708e6d7048834fbc1079f2fabb17b3c125b146af438971e90716c4d',
  nodeType: 'hyperion',
  nodeCount: 3,
  updateInterval: 30000,
  historyfull: true,
  streamingEnabled: true
});

const node = await nodePulse.getNode();
console.log(`Using node: ${node}`);
```

## Class Methods

### constructor(options)

The constructor initializes the NodePulse instance. 

Parameters:

- `options` (object):
  - `nodeType` (string, default: 'hyperion'): Type of node ('hyperion' or 'atomic').
  - `network` (string, default: 'mainnet'): Which network to connect to ('mainnet' or 'testnet').
  - `nodeCount` (number, default: 3): How many nodes to fetch from the API.
  - `updateInterval` (number, default: 30000): Interval for refreshing the node list, in milliseconds.
  - `apiUrl` (string, default: 'https://nodes.nodepulse.co/nodes'): The API URL from which to fetch the healthy node list.
  - `defaultNodes` (object, optional): Custom default nodes to use as fallback.
  - `historyfull` (boolean, default: true): Whether to return Hyperion nodes with full history.
  - `streamingEnabled` (boolean, default: true): Whether to return Hyperion nodes with streaming enabled.
  - `atomicassets` (boolean, default: true): Whether to return Atomic nodes with atomicassets support.
  - `atomicmarket` (boolean, default: true): Whether to return Atomic nodes with atomicmarket support.
  - `useQryHub` (boolean, default: false): Whether to use QryHub for fetching nodes.
  - `qryHubApiUrl` (string, optional): Custom QryHub API URL. Only used if `useQryHub` is true.
  - `chainId` (string, required if `useQryHub` is true): The chain ID to use when fetching nodes from QryHub.

```js
import { NodePulse } from '@sentnl/nodepulse';

const customDefaultNodes = {
  hyperion: {
    mainnet: [
      'https://wax.eosrio.io',
      'https://api.waxsweden.org',
      'https://wax.eu.eosamsterdam.net'
    ]
  }
};

const nodePulse = new NodePulse({
  nodeType: 'hyperion',
  network: 'mainnet',
  nodeCount: 3,
  updateInterval: 60000,
  apiUrl: 'https://nodes.nodepulse.co/nodes',
  defaultNodes: customDefaultNodes,
  historyfull: true,
  streamingEnabled: false
});
```

Example using QryHub:

```js
const nodePulse = new NodePulse({
  useQryHub: true,
  chainId: '73e4385a2708e6d7048834fbc1079f2fabb17b3c125b146af438971e90716c4d',
  nodeType: 'hyperion',
  nodeCount: 3,
  updateInterval: 30000,
  historyfull: true,
  streamingEnabled: true
});
```

### getNode()

Returns the next healthy node from the internal list. If the node list is empty, it will attempt to refresh the list before returning a node. The nodes are selected using a round-robin strategy.


**Example:**

```js
const node = await nodePulse.getNode();
console.log(`Using node: ${node}`);
```


### refreshNodes()

This method allows for manually refreshing the list of nodes. By default, NodePulse automatically refreshes the list at regular intervals, but you can call this method manually if needed.

```js
await nodePulse.refreshNodes();
const node = await nodePulse.getNode();
console.log(`Manually refreshed. Using node: ${node}`);
```


## Default Nodes

If the API fails to return healthy nodes or an error occurs, NodePulse falls back to a predefined list of default nodes. The default nodes are separated by type (hyperion or atomic) and by network (mainnet or testnet).

Default nodes:

```js
this.defaultNodes = {
  hyperion: {
    mainnet: [
      'https://wax.eosusa.news',
      'https://wax.greymass.com',
      'https://wax.cryptolions.io',
    ],
    testnet: [
      'https://testnet.waxsweden.org',
      'https://testnet.wax.pink.gg',
      'https://testnet.wax.eosdetroit.io',
    ],
  },
  atomic: {
    mainnet: [
      'https://wax.api.atomicassets.io',
      'https://aa.wax.blacklusion.io',
      'https://wax-aa.eu.eosamsterdam.net',
    ],
    testnet: [
      'https://test.wax.api.atomicassets.io',
      'https://atomic-wax-testnet.eosphere.io',
      'https://testatomic.waxsweden.org',
    ],
  },
};
```



## Error Handling and Retries

If fetching nodes from the API fails, NodePulse will retry the request up to 3 times. After all retry attempts fail, the library will either retain the existing nodes (if any) or fallback to the default nodes.



## Event Hooks

NodePulse now provides several event hooks that allow developers to react to various events during the node-fetching process. These hooks can be provided as part of the options object when creating an instance of NodePulse.



### onNodeUpdate(nodes)

This hook is triggered every time the node list is successfully updated. The updated list of nodes is passed as an argument.

```js
onNodeUpdate: (nodes) => {
  console.log('Nodes updated:', nodes);
}
```

Parameters:

- `nodes`: The list of updated node URLs.


### onError(error)

This hook is called whenever there is an error while fetching nodes from the API. The error object is passed as an argument.

```js
onError: (error) => {
  console.error('An error occurred:', error.message);
}
```

Parameters:

- `error`: The error object.


### onFallback(fallbackType, nodes)

This hook is triggered when the library falls back to existing or default nodes after failing to fetch new nodes from the API. It passes the fallback type ('existing' or 'default') and the list of fallback nodes as arguments.

```js
onFallback: (fallbackType, nodes) => {
  if (fallbackType === 'existing') {
    console.log('Using existing nodes:', nodes);
  } else if (fallbackType === 'default') {
    console.log('Using default nodes:', nodes);
  }
}
```

Parameters:

- `fallbackType`: A string indicating the fallback type. It can either be 'existing' (using the existing node list) or 'default' (using the default nodes).
- `nodes`: The list of fallback node URLs.



## Logging Options

NodePulse provides flexible logging options to help you debug and monitor its operation. You can control the verbosity of logs and even use a custom logger.

### Log Levels

NodePulse supports the following log levels, in order of increasing verbosity:

1. error
2. warn
3. info
4. debug

### Configuring Logging

You can configure logging by passing options when creating a NodePulse instance:

```js
const nodePulse = new NodePulse({
  // ... other options ...
  logLevel: 'info',
  logger: customLogger // optional
});
```

#### logLevel

The `logLevel` option determines which messages are output. Messages at the specified level and above will be logged. For example, if you set `logLevel: 'warn'`, both 'warn' and 'error' messages will be output, but 'info' and 'debug' messages will be suppressed.

Default value: 'warn'

#### logger

By default, NodePulse uses the console object for logging. You can provide a custom logger object to redirect logs to your preferred logging system. The custom logger should implement methods corresponding to the log levels (error, warn, info, debug).

Default value: console

### Examples

1. Increase verbosity to include info messages:


```js
import { NodePulse } from '@sentnl/nodepulse';

const nodePulse = new NodePulse({
  logLevel: 'info'
});
```

2. Use a custom logger:

```js
import { NodePulse } from '@sentnl/nodepulse';

const customLogger = {
  error: (message) => { /* custom error logging */ },
  warn: (message) => { /* custom warn logging */ },
  info: (message) => { /* custom info logging */ },
  debug: (message) => { /* custom debug logging */ }
};

const nodePulse = new NodePulse({
  logger: customLogger
});
```

3. Suppress all logs except errors:

```js
import { NodePulse } from '@sentnl/nodepulse';

const nodePulse = new NodePulse({
  logLevel: 'error'
});
```

By using these logging options, you can fine-tune the output of NodePulse to suit your development and production needs.
