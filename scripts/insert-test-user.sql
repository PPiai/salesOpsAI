-- Criando usuário de teste diretamente na tabela
INSERT INTO users (username, password_hash, created_at) 
VALUES ('admin', '123456', NOW())
ON CONFLICT (username) DO UPDATE SET password_hash = '123456';

-- Criar mais usuários de teste se necessário
INSERT INTO users (username, password_hash, created_at) 
VALUES ('teste', 'teste123', NOW())
ON CONFLICT (username) DO UPDATE SET password_hash = 'teste123';
