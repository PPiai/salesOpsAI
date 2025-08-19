-- Criando tabela de usuários para login com username/password
CREATE TABLE IF NOT EXISTS users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilitar extensão para criptografia de senha se não existir
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Inserir usuário de teste
INSERT INTO users (username, password_hash) 
VALUES ('admin', crypt('123456', gen_salt('bf')))
ON CONFLICT (username) DO NOTHING;
