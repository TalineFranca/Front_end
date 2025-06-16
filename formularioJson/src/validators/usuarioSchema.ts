import { z } from 'zod';

const UsuarioSchema = z.object({
    nome: z.string().min(1, "Campo nome é obrigatório"),
    email: z.string().min(1, "Campo e-mail é obrigatório").email("Formato de e-mail inválido"),
    sexo: z.string().min(1, "Campo sexo é obrigatório"),
    curso: z.string().min(1, "Campo curso é obrigatório"),
    observacoes: z.string().optional(),
});

export { UsuarioSchema };
