import React from 'react';
import { Hint, Credentials } from '../styles';

const CredentialsHint: React.FC = () => (
  <>
    <Hint>Use as credenciais de exemplo:</Hint>
    <Credentials>
      Admin: admin@example.com / 123456{'\n'}
      Médicos: joao@example.com, maria@example.com, pedro@example.com / 123456
    </Credentials>
  </>
);

export default CredentialsHint;
