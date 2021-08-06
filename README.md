# RIO API (unofficial)

Chamadas da API do Raised in Oblivion implementadas usando node.js.

---

Screenshot do exemplo de monitor de server list:

![](screenshot.png)

---

## Instalando usando *npm*:

- ``npm install https://github.com/vanflux/rio-api.git``

Import de dependência:
```javascript
let { Client } = require('rio-api');
```

---

### Opções do Client:

```javascript
{
  apiOpts: {
    apiUrl: "",
    version: "",
    requestOpts: {
      /*
        Agents, headers customizados
        Opções para a library de request
      */
    },
  },
  request: RequestLibrary, /*
    Library de request customizada,
    precisa ter os métodos http como funções...
    (.get(options), .post(options) ...)
  */
}
```

---

### **Exemplos**:

#### User infos:

```javascript
let client = new Client('STEAM_ID_64_HERE');

let response = await client.loadData();
if (response.hasError) console.error(response.data);
console.log(client.userData);
```

#### Server list:

```javascript
let client = new Client();

let response = await client.loadServerList();
if (response.hasError) console.error(response.data);
console.log(client.serverList.servers);
```

#### Monitor de server list:

```javascript
let client = new Client();

let formatServer = server => (
    server.id + 
    ' (' + server.currentPlayerCount + '/' + server.maxPlayerCount + ')\t' + 
    server.address + 
    '\tplayerHistory: [' + server.playersHistory.map(x => x.value).join(',') + ']'
  );
  
client.serverList.on('new server',    server => {
  console.log('[New Server]    ' + formatServer(server));
});
client.serverList.on('update server', server => {
  console.log('[Update Server] ' + formatServer(server));
});
client.serverList.on('remove server', server => {
  console.log('[Remove Server] ' + formatServer(server));
});

let response = await client.loadServerList();
if (response.hasError) console.error(response.data);
setInterval(async () => {
  console.log('Updating...');
  let response = await client.loadServerList();
  if (response.hasError) console.error(response.data);
}, 5000);
```

---

## Chamadas implementadas:
  - 🟢 Server List (lista de servidores)
  - 🟡 Get Player Status (status do player como kills e deaths)
  - 🟡 Get Player Characters (personagens do player)

### Legenda:
| |
|-|
| 🟢 = Não precisa de autenticação |
| 🟡 = Precisa de autenticação |

#### Para conseguir informações de player é necessário ter o steamId64 do mesmo.

É possível obter o steamId64 a partir do nickname usando o site [https://www.steamidfinder.com](https://www.steamidfinder.com)

---

## Clonando repositório:

### Requisitos
- Node.js ([https://nodejs.org/](https://nodejs.org/))

### Clone o repositório
- ``git clone https://github.com/vanflux/rio-api.git``

### Vá até a pasta

- ``cd rio-api``

### Instale as dependências

- ``npm install``

### Rode (A aplicação já vem com 3 exemplos default, des-comente o que você quiser ver)

- ``npm run start`` ou ``npm run dev``
