// src/components/settings/database/ClientRegistrationStructure.tsx
import React from 'react';
import { UsersIcon, HomeIcon, NavigationIcon, CheckCircleIcon } from '../../../icons/Icons';

const SectionHeader = ({ icon, title, subtitle }) => (
    <div className="flex items-start mb-4">
        <div className="text-blue-400 mt-1 mr-4 shrink-0">{icon}</div>
        <div>
            <h4 className="font-semibold text-white">{title}</h4>
            <p className="text-sm text-gray-400">{subtitle}</p>
        </div>
    </div>
);

const FieldDisplay = ({ label, detail, isDynamic = false }) => (
    <div className={`bg-gray-700/50 p-3 rounded-lg flex justify-between items-center ${isDynamic ? 'border-l-2 border-blue-400' : ''}`}>
        <span className="text-white text-sm">{label}</span>
        {detail && <span className="text-xs text-gray-400 font-mono">{detail}</span>}
    </div>
);

export const ClientRegistrationStructure = () => (
    <div className="animate-[slideUp_0.2s_ease-out_forwards]">
        <div className="bg-blue-900/50 p-4 rounded-lg border border-blue-700 mb-6">
            <h3 className="font-semibold text-lg text-white">Estrutura de Dados do Cliente</h3>
            <p className="text-sm text-blue-200 mt-1">
                Este é um resumo visual da estrutura de dados para o cadastro de clientes. O formulário é dinâmico e se adapta ao tipo de cliente (Pessoa Física ou Jurídica).
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {/* Coluna Principal */}
            <div className="md:col-span-3 space-y-6">
                <div>
                    <SectionHeader 
                        icon={<UsersIcon />} 
                        title="Identificação do Cliente"
                        subtitle="Informações básicas e fiscais."
                    />
                    <div className="space-y-2">
                        <FieldDisplay label="Tipo de Cliente" detail="PJ / PF" isDynamic />
                        <FieldDisplay label="CNPJ / CPF" detail="string" isDynamic />
                        <FieldDisplay label="Razão Social / Nome Completo" detail="string" isDynamic />
                        <FieldDisplay label="Nome Fantasia" detail="string (opcional, PJ)" />
                        <FieldDisplay label="Nome do Contato" detail="string" />
                        <FieldDisplay label="Email" detail="string" />
                        <FieldDisplay label="Telefone" detail="string" />
                    </div>
                </div>
                 <div>
                    <SectionHeader 
                        icon={<HomeIcon />} 
                        title="Endereço"
                        subtitle="Localização física do cliente."
                    />
                     <div className="space-y-2">
                        <FieldDisplay label="CEP" detail="string (busca automática)" />
                        <FieldDisplay label="Rua / Logradouro" detail="string" />
                        <FieldDisplay label="Número" detail="string" />
                        <FieldDisplay label="Bairro" detail="string" />
                        <FieldDisplay label="Região" detail="string (opcional)" />
                        <FieldDisplay label="Cidade" detail="string" />
                        <FieldDisplay label="Estado (UF)" detail="string" />
                    </div>
                </div>
            </div>

            {/* Coluna Lateral */}
            <div className="md:col-span-2 space-y-6">
                <div>
                     <SectionHeader 
                        icon={<CheckCircleIcon className="w-6 h-6" />}
                        title="Status"
                        subtitle="Define se o cliente está ativo."
                    />
                     <div className="space-y-2">
                         <FieldDisplay label="Status" detail="Ativo / Inativo" />
                    </div>
                </div>
                <div>
                     <SectionHeader 
                        icon={<NavigationIcon className="w-6 h-6"/>}
                        title="Localização Geográfica"
                        subtitle="Coordenadas para roteirização."
                    />
                     <div className="space-y-2">
                        <FieldDisplay label="Latitude" detail="number" />
                        <FieldDisplay label="Longitude" detail="number" />
                    </div>
                </div>
            </div>
        </div>
    </div>
);