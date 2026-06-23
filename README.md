# Ranking Pacotes por Minuto

Painel web para ranking de produtividade por pacotes/minutos, com abas de ordem alfabetica, performance, performance volumoso, performance por gestor e gestao hora a hora.

## Como Publicar no GitHub Pages

1. Crie um repositorio no GitHub.
2. Envie todos os arquivos desta pasta para o repositorio.
3. No GitHub, entre em **Settings > Pages**.
4. Em **Build and deployment**, selecione:
   - Source: **Deploy from a branch**
   - Branch: **main**
   - Folder: **/root**
5. Clique em **Save**.
6. Aguarde alguns minutos ate o GitHub gerar o link do site.

O link ficara parecido com:

`https://seu-usuario.github.io/nome-do-repositorio/`

## Arquivos Principais

- `index.html`: painel principal. No GitHub Pages precisa ter esse nome.
- `ranking-dados.js`: dados iniciais do painel.

## Importante

Nesta versao, os dados ficam salvos no navegador de cada computador. O GitHub Pages publica o painel online, mas ainda nao sincroniza os dados entre maquinas.

Para sincronizacao ao vivo entre varios computadores, a proxima etapa e conectar o painel a uma base em tempo real, como Firebase.

## Uso

1. Abra o link do GitHub Pages.
2. Clique em **Editar dados**.
3. Cole nomes, tempo efetivo e unidades.
4. Cadastre gestores quando necessario.
5. Acompanhe as abas:
   - Ordem alfabetica.
   - Performance.
   - Performance volumoso.
   - Performance por gestor.
   - Gestao hora a hora.

## Observacao

As informacoes alimentadas no painel ficam gravadas no navegador por meio do armazenamento local. Para limpar ou recomecar, use os botoes de limpeza dentro do editor de dados.

