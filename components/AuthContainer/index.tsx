import React from "react";
import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";

export interface IAuthContainerProps {
    header: any;
    children: React.ReactNode;
}

export default function AuthContainer({
    children,
    header,
}: IAuthContainerProps) {
    return (
        <Container>
            <Row>
                <Col
                    xs={{ size: 10, offset: 1 }}
                    sm={{ size: 8, offset: 2 }}
                    md={{ size: 6, offset: 3 }}
                    lg={{ size: 4, offset: 4 }}
                >
                    <Card className="mt-5">
                        <CardHeader className="bg-primary text-black">
                            {header}
                        </CardHeader>
                        <CardBody>{children}</CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}
