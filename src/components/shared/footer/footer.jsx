
const Footer = () => {
  return (
    <footer className="bg-[var(--background)] py-6 border-t border-[var(--border)] text-center text-sm h-[70px] text-[var(--text-muted)]">
      © {new Date().getFullYear()} Daftar. All rights reserved.
    </footer>
  );
}

export default Footer;
