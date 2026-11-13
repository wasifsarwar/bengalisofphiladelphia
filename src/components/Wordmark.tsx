import { imageUrl } from "../data/content";

export function Wordmark() {
  return (
    <span className="wordmark">
      <img className="brand-logo" src={imageUrl("bop-logo.webp")} alt="" width="1290" height="1281" />
      <span className="wordmark-name">Bengalis of<br />Philadelphia</span>
    </span>
  );
}
