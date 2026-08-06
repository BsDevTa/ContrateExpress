# ContrateExpress Landing Page

Landing page estática criada com HTML5, CSS3 e JavaScript puro para a marca ContrateExpress, com tema premium em preto/grafite, textos claros e destaque institucional em verde-oliva.

## Estrutura do projeto

- `index.html`: conteúdo, SEO, semântica e estrutura das seções.
- `style.css`: identidade visual escura, variáveis do tema, layout responsivo e animações.
- `script.js`: interações da página, validação e comportamento dinâmico.
- `assets/images/`: imagens utilizadas pela página.
- `assets/logo/`: marca em PNG transparente usada no header e rodapé.

## Como executar localmente

1. Abra a pasta `ContrateExpress` no VS Code.
2. Instale e ative a extensão Live Server, se ainda não estiver disponível.
3. Clique com o botão direito em `index.html` e escolha `Open with Live Server`.

Também é possível abrir `index.html` diretamente no navegador, mas o Live Server facilita testar rolagem suave, navegação e interações.

## Onde substituir cada imagem

Use a tabela abaixo como referência para trocar os placeholders sem precisar alterar a estrutura da página.

| Arquivo atual | Local |
| --- | --- |
| `assets/logo/contrateexpress-logo.png` | Header e rodapé |
| `assets/images/hero-contrateexpress.png` | Hero |
| `assets/images/mentoria-contrateexpress.png` | Mentoria |
| `assets/images/about-contrateexpress.png` | Sobre |

As imagens aprovadas estão referenciadas diretamente no `index.html`. Ao substituir algum arquivo, mantenha o mesmo caminho ou atualize todas as referências correspondentes.

## Como editar textos e cores

- Os textos principais estão diretamente no `index.html`.
- As cores estão centralizadas no começo do `style.css`, dentro de `:root`.
- O tema atual utiliza `#232323` como fundo principal, `#92983e` como verde-oliva institucional e textos em branco com transparências controladas.
- Para ajustar espaçamento, tipografia e comportamento responsivo, edite os blocos correspondentes no mesmo arquivo CSS.

## Como alterar o número do WhatsApp

Abra `script.js` e substitua esta linha, se houver necessidade futura:

```js
const WHATSAPP_NUMBER = "5571988221221";
```

Depois atualize também os links de WhatsApp no `index.html` e, se desejar, o texto exibido no rodapé.

## Como publicar como site estático

1. Envie a pasta `ContrateExpress` para o provedor de hospedagem estática de sua preferência.
2. Garanta que `index.html` esteja na raiz da publicação.
3. Publique os arquivos exatamente como estão, sem build adicional.

Como exemplo, a página já está preparada para rota pública semelhante a:

`https://bsdevta.github.io/ContrateExpress/`

## Observações

- Não há dependências de framework.
- Não há backend.
- Não há uso de imagens remotas aleatórias.
- Todos os espaços visuais foram preparados com placeholders responsivos.
