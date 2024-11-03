// import css
import './Footer.css';


// Footer title props
type FooterTitleProps = {
    title: string;
};

// footer
const Footer = ({title}: FooterTitleProps) => {
    return (
        <footer>
            <p>{title}</p>
        </footer>
    );
}

// export
export default Footer;

