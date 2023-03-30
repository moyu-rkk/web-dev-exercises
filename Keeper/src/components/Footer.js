import React from "react";

function Footer() {
const year = new Date().getFullYear();

    return <footer>
       <p>©Angela & Rubin. Use for <span>Rubin's</span> Portfolio {year} .</p>
    </footer>
}

export default Footer;