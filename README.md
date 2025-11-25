# 📸 Aplicativo de Câmera com Arquitetura MVVM

## 📘 Disciplina
**Programação para Dispositivos Móveis (PDM)**

## 🎯 Objetivo Geral
Este projeto tem como objetivo refatorar um aplicativo de câmera desenvolvido anteriormente, reorganizando-o segundo a arquitetura **MVVM (Model-View-ViewModel)**.  
Além disso, o app foi dividido em telas independentes e toda a interface foi reconstruída usando a biblioteca **Gluestack UI**.

---

## 🗂 Estrutura do Projeto

O projeto segue boas práticas de separação de responsabilidades:
```bash
src/
├── model/
│ └── MyPhoto.ts
│
├── viewmodel/
│ ├── UseIndexViewModel.ts
│ └── GaleryViewModel.ts
│
├── app/
│ ├── index.tsx (Tela da Câmera)
│ ├── galery.tsx (Tela da Galeria)
│ ├── photoDetail.tsx (Tela de Detalhes da Foto)
│
└── components/
└── (componentes reutilizáveis)
```

---

## Arquitetura MVVM

O projeto foi reorganizado para seguir a arquitetura MVVM, garantindo uma separação clara entre responsabilidades:

### **Model**
- `MyPhoto.ts` define a estrutura das fotos: URI, latitude, longitude e timestamp.

### **ViewModel**
- `UseIndexViewModel.ts`
  - Gerencia estado da câmera (frontal/traseira)
  - Lida com permissões (câmera e localização)
  - Captura fotos e salva localização
- `GaleryViewModel.ts`
  - Gerencia lista de fotos
  - Funções para adicionar/excluir fotos
  - Ordenação por data

### **View**
- `index.tsx`
  - Exibição da câmera
  - Botões de trocar câmera e tirar foto
- `galery.tsx`
  - Lista de fotos
  - Localização (lat/long)
  - Ordenação por data
- `photoDetail.tsx`
  - Foto grande
  - Mapa com localização (react-native-maps)
  - Informações adicionais

---


Os componentes visuais recebem tudo via props, sem regras de negócio. Estados locais são usados apenas para UI.

---

## Interface com Gluestack UI

A interface foi reescrita utilizando a biblioteca **react-native-gluestack**, substituindo os componentes nativos pelos equivalentes da biblioteca. Os principais componentes utilizados incluem:
- **Box, Button, Text**
- **VStack, HStack**
- **Image**
- **ScrollView/FlatListWrapper**

A interface final é limpa, organizada, responsiva e fiel aos princípios de UI da biblioteca.

---

## 📱 Funcionalidades Implementadas

### **Tela da Câmera**
- Visualização em tempo real
- Trocar câmera frontal/traseira
- Capturar fotos
- Salvar foto com dados de localização

### **Tela da Galeria**
- Lista de fotos com miniaturas
- Exibe latitude/longitude
- Ordenação por data
- Toque para ver detalhes

### **Tela Extra — Detalhes**
- Foto ampliada
- Mapa com marcador (react-native-maps)
- Data e coordenadas
- Botão para voltar

---
## Desafio Extra (Opcional)

A terceira tela chamada **PhotoDetail** foi implementada com sucesso. Ela exibe:
- A foto em tamanho grande.
- Um mapa com marcador indicando a localização onde a foto foi tirada (se disponível).

### Funcionalidades:
- Exibição da foto capturada em tamanho grande.
- Exibição de um mapa interativo com marcador, utilizando `react-native-maps`.
- Informações adicionais, como data e coordenadas (latitude e longitude).
- Botão para retornar à galeria.

### Tecnologias utilizadas:
- **React Native**
- **Expo Router** para navegação.
- **react-native-maps** para exibição do mapa.

### Como testar:
1. Navegue até a galeria.
3. Clique na foto para ver os detalhes.
4. Clique no botão "Detalhes" de uma foto.
5. Verifique a exibição da foto, mapa e informações adicionais.
6. Utilize o botão "Voltar" para retornar à galeria.



---

## Como Executar o Projeto

### **Pré-requisitos**
- Node.js instalado.
- Expo CLI configurado.

### **Passos**
1. Clone o repositório:
   ```bash
   git clone https://github.com/igordev23/Atividade-camera-gluestack.git
```
2. Navegue até o diretório do projeto:
   ```bash
   cd nome-do-projeto
   ```
3. Instale as dependências:
   ```bash
   npm install
   ```
4. Inicie o aplicativo:
   ```bash
   npx expo start
   ```