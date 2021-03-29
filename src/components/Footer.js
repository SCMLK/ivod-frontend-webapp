import React from "react";
import {
    Box,
    Container,
    Row,
    Column,
    FooterLink,
    Heading,
    FooterHeading,
} from "./styles/FooterStyles";
import IfisLogo from '../images/ifis_white.svg';

const Footer = () => {
    return (
        <Box>
            <FooterHeading>
                Interaktive Visualisierung von Open Data
            </FooterHeading>
            <Container>
                <Row>
                    <Column>
                        <Heading>Information</Heading>
                        <FooterLink href="#">Ziel</FooterLink>
                        <FooterLink href="#">Vision</FooterLink>
                        <FooterLink href="#">Förderung</FooterLink>
                    </Column>
                    <Column>
                        <Heading>Hilfe</Heading>
                        <FooterLink href="#">API</FooterLink>
                        <FooterLink href="#">Benutzung</FooterLink>
                    </Column>
                    <Column>
                        <Heading>Kontakt</Heading>
                        <FooterLink href="#">Email</FooterLink>
                        <FooterLink href="#">Formular</FooterLink>
                    </Column>
                    <Column>
                        <Heading>Legal</Heading>
                        <FooterLink href="#">AGB's</FooterLink>
                        <FooterLink href="#">Impressum</FooterLink>
                    </Column>
                </Row>
            </Container>
        </Box>
    );
};
export default Footer;

