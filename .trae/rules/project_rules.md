# 📘 MVVM Rules — Guia Oficial do Projeto

Este documento estabelece as regras, princípios e diretrizes para o uso correto do padrão **MVVM (Model–View–ViewModel)** neste projeto em **React Native + TypeScript + Expo Router**.

---

# 📐 1. Conceitos Fundamentais do MVVM

## 🔹 Model
- Contém entidades, regras de negócio, serviços e repositórios.
- Representa o domínio puro da aplicação.
- Não depende da interface nem de bibliotecas externas.

Exemplos:
- `entities/User.ts`
- `services/AuthService.ts`

## 🔹 ViewModel
- Gerencia estados e ações.
- Atua como ponte entre Model e View.
- Não deve conter UI.
- Implementada como Custom Hooks.

Exposição obrigatória:
- **state** → dados prontos para renderização  
- **actions** → funções chamadas pela View

## 🔹 View
- Interface visual consumida pelo usuário.
- Apenas renderiza dados da ViewModel.
- Não contém lógica de negócio.

---

# 🧱 2. Estrutura de Pastas Oficial

```bash
src/
├─ app/
│ ├─ _layout.tsx
│ ├─ index.tsx
│ └─ home.tsx
│
├─ model/
│ ├─ entities/
│ ├─ repositories/
│ └─ services/
│
├─ viewmodel/
│ └─ useLoginViewModel.ts
│
└─ view/
├─ components/
└─ LoginView.tsx
```


---

# 🔧 3. Regras Gerais

## ✔ 3.1 Model
- Apenas lógica de domínio.
- Sem JSX ou imports de UI.
- Regras de negócio permanecem aqui.

## ✔ 3.2 ViewModel
- Sempre como Custom Hook (`useXxxViewModel`).
- Pode usar `useState`, `useEffect`, `useCallback`.
- Sem lógica visual.
- Não acessa elementos da View diretamente.
- Sempre usar type useXxxViewModelState para o estado quando nescessario.
- Sempre usar type useXxxViewModelActions para as ações Quando nescessario.
Deve retornar:
```ts
return {
  state: { ... },
  actions: { ... }
}
```

## ✔ 3.3 View


Apenas interface visual.


Usa estado da ViewModel.


Chama ações da ViewModel.


Pode ter estados visuais (ex.: texto de input).

sempre use o gluestack ui com tailwindcss para criar os componentes visuais.



## 📡 4. Fluxo de Comunicação
Usuário → View → Actions → ViewModel → Model
                        ↑        ↓
                Estado pronto ←—

A View nunca fala diretamente com o Model.

## 📏 5. Padrões de Nomeação


Views: PascalCase → LoginView.tsx


ViewModels: camelCase → useLoginViewModel.ts


Models/Entities: PascalCase → User.ts


Pastas: camelCase



## 6. Boas Práticas Obrigatórias


Arquivos pequenos e coesos.


Lógica complexa sempre no Model.


ViewModel com no máximo ~150 linhas.


Views limpas e declarativas.


Componentes reutilizáveis em view/components.


Criar theme.ts para cores, fontes e espaçamentos.



## 🧪 6. Testabilidade e Testes Automatizados

Testar apenas a lógica de negócio.

Services devem ser testáveis sem depender da UI.

ViewModels devem ser independentes de React sempre que possível.

Não usar elementos visuais na ViewModel.

Implementação de testes automatizados obrigatória:

Testes unitários da camada de lógica de negócio (ex.: ViewModel).

Testes das funções relacionadas ao CRUD de tarefas.

Testes de serviços via interfaces (DI) para facilitar mocks.



## 🚀 8. Evolução Futura (MVVM Avançado)


Model 100% puro e independente.


Infraestrutura separada para acesso a APIs e banco local.


ViewModel desacoplada sem dependência de React.


Repositórios com interfaces.



## 9. Checklist Antes de Subir PR


 A ViewModel é um hook?


 A View não tem regra de negócio?


 Model não contém UI?


 ViewModel retorna apenas estado e ações?


 Componentes visuais estão em /view/components?


 Nomes seguem o padrão?


 Lógica de domínio está dentro do Model?



## 📚 10. Considerações Finais
Este documento serve como referência permanente para desenvolvimento no padrão MVVM Simplificado aplicado ao React Native com TypeScript e Expo Router.

---

