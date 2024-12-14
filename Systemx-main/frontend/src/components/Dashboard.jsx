import { CCard, CCardBody, CCardHeader } from '@coreui/react';
import React from 'react';

const Dashboard = () => {
    return (
        <CCard>
            <CCardHeader>
                Resumen del Dashboard
            </CCardHeader>
            <CCardBody>
                {/* Aquí puedes agregar gráficos, tablas y otros componentes */}
                <p>Métrica 1: 100</p>
                <p>Métrica 2: 200</p>
            </CCardBody>
        </CCard>
    );
};

export default Dashboard;