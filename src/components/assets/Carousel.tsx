// components/Carousel.tsx
import React from 'react';
import {
    SiPython,
    SiCplusplus,
    SiHtml5,
    SiCss3,
    SiJavascript,
    SiTypescript,
    SiPhp,
    SiPostgresql,
    SiMysql,
    SiReact,
    SiFastapi,
    SiSymfony,
    SiGit,
    SiGithub,
    SiPostman,
    SiDocker,
    SiSelenium,
    SiConfluence,
    SiJira,
} from 'react-icons/si';
import { FaAws, FaJava, FaCcStripe } from 'react-icons/fa';
import { VscVscode } from 'react-icons/vsc';

export const Carousel: React.FC = () => {
    const languagesArray = [
        <SiPython />,
        <FaJava />,
        <SiCplusplus />,
        <SiHtml5 />,
        <SiCss3 />,
        <SiJavascript />,
        <SiTypescript />,
        <SiPhp />,
        <SiPostgresql />,
        <SiMysql />,
        <SiReact />,
        <SiFastapi />,
        <SiSymfony />,
    ];

    const toolsArray = [
        <SiGit />,
        <SiGithub />,
        <VscVscode />,
        <SiPostman />,
        <FaAws />,
        <SiJira />,
        <SiConfluence />,
        <SiDocker />,
        <SiSelenium />,
        <FaCcStripe />,
    ];

    return (
        <div>
            {/* Language Icons */}
            <div className="icons">
                <div className="icons-slide">
                    {[...languagesArray, ...languagesArray].map(
                        (icon, index) => (
                            <div key={index} className="icon">
                                {icon}
                            </div>
                        )
                    )}
                </div>
            </div>
            {/* Tool Icons */}
            <div className="icons">
                <div className="icons-slide tools">
                    {[...toolsArray, ...toolsArray].map((icon, index) => (
                        <div key={index} className="icon">
                            {icon}
                        </div>
                    ))}
                </div>
            </div>{' '}
        </div>
    );
};
