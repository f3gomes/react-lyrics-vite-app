export function Footer(props) {
  return (
    <footer className={props.position > 32 ? null : "footer-position"}>
      <span>
        Made By{" "}
        <a href="https://github.com/f3gomes" target="_blank">
          <strong>Felipe Gomes</strong>
        </a>
      </span>
    </footer>
  );
}
