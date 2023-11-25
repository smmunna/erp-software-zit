
const Footer = () => {
    const date = new Date();
    const year = date.getFullYear();
    return (
        <div>
            <footer className="footer footer-center p-4 bg-base-300 text-base-content bottom-0 z-20">
                <aside>
                    <p>Copyright © {year} - Developed by Sm. Munna</p>
                </aside>
            </footer>
        </div>
    );
}

export default Footer;
