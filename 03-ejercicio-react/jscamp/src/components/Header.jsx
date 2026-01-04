import React from "react";
export default function Header() {
    return (
        <>
            <header>
                <h1>
                    <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                    >
                        <polyline points="16 18 22 12 16 6"></polyline>
                        <polyline points="8 6 2 12 8 18"></polyline>
                    </svg>
                    DevJobs
                </h1>

                <nav>
                    <a href="#">Empleos</a>
                </nav>

                <a href="#" aria-label="Ir a mi perfil" title="Mi perfil">
                    <img
                        src="https://unavatar.io/github/mdo"
                        alt="Avatar del usuario"
                        width="32"
                        height="32"
                    />
                </a>
            </header>
        </>
    );

}