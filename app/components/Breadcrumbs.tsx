import { Breadcrumbs as MuiBreadcrumbs } from "@mui/material";
import Link from "next/link";
function Breadcrumbs({ links, currentPage }) {
  return (
    <MuiBreadcrumbs aria-label="breadcrumb">
      <Link href="/">Home</Link>
      {links.map((l) => (
        <Link href={l.url}>{l.text}</Link>
      ))}
    </MuiBreadcrumbs>
  );
}

export default Breadcrumbs;
