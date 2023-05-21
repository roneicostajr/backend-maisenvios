# Teste Backend Mais Envios

## Desenvolvimento

O objetivo do teste será construir uma API REST.

Será avaliado a capacidade de estimativa do(a) desenvolvedor(a), em conjunto com a capacidade de desenvolver uma nova API, e seguindo bons padrões de código.

### API Rest

- [x] Visualizar Tags
- [x] Selecionar Tag por id
- [x] Editar Tag por id
- [x] Remover Tag por id
- [x] Criar Tag

### Documentação

- [ ] Implementar Swagger

### Testes

- [ ] 40% de cobertura de código
- [ ] 60% de cobertura de código
- [ ] 80% de cobertura de código

### Docker

É possivel executar o projeto em um container docker

#### Docker CLI

Execute no terminal `docker build -t nest-maisenvios-api .` seguido de `docker run -p3000:3000 nest-maisenvios-api`

#### Makefile

Execute no terminal `make build` seguido de `make up`
