export const asPage = (el: JSX.Element): JSX.Element => {
  if (typeof el === 'string') {
    return '<!DOCTYPE html>' + el
  }
  return el.then((el) => '<!DOCTYPE html>' + el)
}

export const Header = () => (
  <>
    <script src="lib/htmx.org/htmx.min.js"></script>
    <script src="lib/htmx.org/ext/json-enc.js"></script>
    <link rel="icon" type="image/ico" sizes="48x48" href="/public/images/favicon.ico" />
    <link rel="stylesheet" type="text/css" href="/public/styles/main.css" />
  </>
)
