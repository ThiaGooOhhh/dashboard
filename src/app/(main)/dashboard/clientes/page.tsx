
"use client";

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { UsersIcon, HomeIcon, NavigationIcon, CheckCircleIcon, PlusIcon, SearchIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ClienteFormData {
  tipo: 'PF' | 'PJ' | '';
  documento: string;
  razaoSocialNome: string;
  nomeFantasia: string;
  nomeContato: string;
  email: string;
  telefone: string;
  cep: string;
  logradouro: string;
  numero: string;
  bairro: string;
  regiao: string;
  cidade: string;
  uf: string;
  latitude: number | null;
  longitude: number | null;
  ativo: boolean;
}

const initialFormData: ClienteFormData = {
  tipo: '',
  documento: '',
  razaoSocialNome: '',
  nomeFantasia: '',
  nomeContato: '',
  email: '',
  telefone: '',
  cep: '',
  logradouro: '',
  numero: '',
  bairro: '',
  regiao: '',
  cidade: '',
  uf: '',
  latitude: null,
  longitude: null,
  ativo: true,
};

export default function ClientesPage() {
  const [formData, setFormData] = useState<ClienteFormData>(initialFormData);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const handleInputChange = (field: keyof ClienteFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const buscarCEP = async (cep: string) => {
    if (cep.length === 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();
        if (!data.erro) {
          setFormData(prev => ({
            ...prev,
            logradouro: data.logradouro,
            bairro: data.bairro,
            cidade: data.localidade,
            uf: data.uf
          }));
        }
      } catch (error) {
        console.error('Erro ao buscar CEP:', error);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Dados do cliente:', formData);
    // Aqui você implementaria a lógica para salvar o cliente
    alert('Cliente cadastrado com sucesso!');
    setFormData(initialFormData);
    setMostrarFormulario(false);
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Gestão de Clientes</h1>
          <p className="text-muted-foreground">Cadastre e gerencie seus clientes</p>
        </div>
        <Button 
          onClick={() => setMostrarFormulario(!mostrarFormulario)}
          className="flex items-center gap-2"
        >
          <PlusIcon className="w-4 h-4" />
          Novo Cliente
        </Button>
      </div>

      {mostrarFormulario && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UsersIcon className="w-5 h-5" />
              Cadastro de Novo Cliente
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Seção: Identificação do Cliente */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <UsersIcon className="w-5 h-5 text-blue-500" />
                  <h3 className="text-lg font-semibold">Identificação do Cliente</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="tipo">Tipo de Cliente *</Label>
                    <Select value={formData.tipo} onValueChange={(value) => handleInputChange('tipo', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="PF">Pessoa Física</SelectItem>
                        <SelectItem value="PJ">Pessoa Jurídica</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="documento">
                      {formData.tipo === 'PJ' ? 'CNPJ *' : 'CPF *'}
                    </Label>
                    <Input
                      id="documento"
                      value={formData.documento}
                      onChange={(e) => handleInputChange('documento', e.target.value)}
                      placeholder={formData.tipo === 'PJ' ? '00.000.000/0000-00' : '000.000.000-00'}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="razaoSocialNome">
                      {formData.tipo === 'PJ' ? 'Razão Social *' : 'Nome Completo *'}
                    </Label>
                    <Input
                      id="razaoSocialNome"
                      value={formData.razaoSocialNome}
                      onChange={(e) => handleInputChange('razaoSocialNome', e.target.value)}
                      required
                    />
                  </div>

                  {formData.tipo === 'PJ' && (
                    <div>
                      <Label htmlFor="nomeFantasia">Nome Fantasia</Label>
                      <Input
                        id="nomeFantasia"
                        value={formData.nomeFantasia}
                        onChange={(e) => handleInputChange('nomeFantasia', e.target.value)}
                      />
                    </div>
                  )}

                  <div>
                    <Label htmlFor="nomeContato">Nome do Contato *</Label>
                    <Input
                      id="nomeContato"
                      value={formData.nomeContato}
                      onChange={(e) => handleInputChange('nomeContato', e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">E-mail *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="telefone">Telefone *</Label>
                    <Input
                      id="telefone"
                      value={formData.telefone}
                      onChange={(e) => handleInputChange('telefone', e.target.value)}
                      placeholder="(00) 00000-0000"
                      required
                    />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Seção: Endereço */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <HomeIcon className="w-5 h-5 text-blue-500" />
                  <h3 className="text-lg font-semibold">Endereço</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="cep">CEP *</Label>
                    <div className="flex gap-2">
                      <Input
                        id="cep"
                        value={formData.cep}
                        onChange={(e) => {
                          const cep = e.target.value.replace(/\D/g, '');
                          handleInputChange('cep', cep);
                          if (cep.length === 8) {
                            buscarCEP(cep);
                          }
                        }}
                        placeholder="00000-000"
                        maxLength={8}
                        required
                      />
                      <Button type="button" variant="outline" size="icon">
                        <SearchIcon className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <Label htmlFor="logradouro">Logradouro *</Label>
                    <Input
                      id="logradouro"
                      value={formData.logradouro}
                      onChange={(e) => handleInputChange('logradouro', e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="numero">Número *</Label>
                    <Input
                      id="numero"
                      value={formData.numero}
                      onChange={(e) => handleInputChange('numero', e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="bairro">Bairro *</Label>
                    <Input
                      id="bairro"
                      value={formData.bairro}
                      onChange={(e) => handleInputChange('bairro', e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="regiao">Região</Label>
                    <Input
                      id="regiao"
                      value={formData.regiao}
                      onChange={(e) => handleInputChange('regiao', e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="cidade">Cidade *</Label>
                    <Input
                      id="cidade"
                      value={formData.cidade}
                      onChange={(e) => handleInputChange('cidade', e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="uf">Estado (UF) *</Label>
                    <Input
                      id="uf"
                      value={formData.uf}
                      onChange={(e) => handleInputChange('uf', e.target.value)}
                      maxLength={2}
                      required
                    />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Seção: Localização e Status */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <NavigationIcon className="w-5 h-5 text-blue-500" />
                    <h3 className="text-lg font-semibold">Localização Geográfica</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="latitude">Latitude</Label>
                      <Input
                        id="latitude"
                        type="number"
                        step="any"
                        value={formData.latitude || ''}
                        onChange={(e) => handleInputChange('latitude', e.target.value ? parseFloat(e.target.value) : null)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="longitude">Longitude</Label>
                      <Input
                        id="longitude"
                        type="number"
                        step="any"
                        value={formData.longitude || ''}
                        onChange={(e) => handleInputChange('longitude', e.target.value ? parseFloat(e.target.value) : null)}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <CheckCircleIcon className="w-5 h-5 text-blue-500" />
                    <h3 className="text-lg font-semibold">Status</h3>
                  </div>
                  <div className="flex items-center gap-3">
                    <Switch
                      id="ativo"
                      checked={formData.ativo}
                      onCheckedChange={(checked) => handleInputChange('ativo', checked)}
                    />
                    <Label htmlFor="ativo">Cliente Ativo</Label>
                    <Badge variant={formData.ativo ? "default" : "secondary"}>
                      {formData.ativo ? "Ativo" : "Inativo"}
                    </Badge>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Botões de Ação */}
              <div className="flex gap-4 justify-end">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setMostrarFormulario(false)}
                >
                  Cancelar
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setFormData(initialFormData)}
                >
                  Limpar
                </Button>
                <Button type="submit">
                  Cadastrar Cliente
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Lista de Clientes (placeholder) */}
      {!mostrarFormulario && (
        <Card>
          <CardHeader>
            <CardTitle>Clientes Cadastrados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-muted-foreground">
              <UsersIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Nenhum cliente cadastrado ainda.</p>
              <p className="text-sm">Clique em "Novo Cliente" para começar.</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
