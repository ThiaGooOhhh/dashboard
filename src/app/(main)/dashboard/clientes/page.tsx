
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Users, Building2, MapPin, Globe, Save, Plus } from "lucide-react";

type TipoCliente = "PF" | "PJ";

interface FormData {
  tipoCliente: TipoCliente;
  documento: string;
  razaoSocial: string;
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
  latitude: string;
  longitude: string;
  ativo: boolean;
}

export default function ClientesPage() {
  const [formData, setFormData] = useState<FormData>({
    tipoCliente: "PF",
    documento: "",
    razaoSocial: "",
    nomeFantasia: "",
    nomeContato: "",
    email: "",
    telefone: "",
    cep: "",
    logradouro: "",
    numero: "",
    bairro: "",
    regiao: "",
    cidade: "",
    uf: "",
    latitude: "",
    longitude: "",
    ativo: true,
  });

  const [buscandoCep, setBuscandoCep] = useState(false);

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const buscarCep = async (cep: string) => {
    if (cep.length === 8) {
      setBuscandoCep(true);
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
        console.error("Erro ao buscar CEP:", error);
      }
      setBuscandoCep(false);
    }
  };

  const handleCepChange = (cep: string) => {
    const cepLimpo = cep.replace(/\D/g, "");
    handleInputChange("cep", cepLimpo);
    if (cepLimpo.length === 8) {
      buscarCep(cepLimpo);
    }
  };

  const formatarDocumento = (documento: string, tipo: TipoCliente) => {
    const numeros = documento.replace(/\D/g, "");
    if (tipo === "CPF") {
      return numeros.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    } else {
      return numeros.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Dados do cliente:", formData);
    // Aqui você implementaria a lógica de salvamento
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Cadastro de Clientes</h1>
          <p className="text-muted-foreground">
            Gerencie o cadastro de clientes pessoa física e jurídica
          </p>
        </div>
        <Badge variant="outline" className="text-sm">
          {formData.tipoCliente === "PF" ? "Pessoa Física" : "Pessoa Jurídica"}
        </Badge>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Coluna Principal - Identificação */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Identificação do Cliente
                </CardTitle>
                <CardDescription>
                  Informações básicas e fiscais do cliente
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="tipoCliente">Tipo de Cliente *</Label>
                    <Select 
                      value={formData.tipoCliente} 
                      onValueChange={(value: TipoCliente) => handleInputChange("tipoCliente", value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="PF">Pessoa Física</SelectItem>
                        <SelectItem value="PJ">Pessoa Jurídica</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="documento">
                      {formData.tipoCliente === "PF" ? "CPF" : "CNPJ"} *
                    </Label>
                    <Input
                      id="documento"
                      value={formatarDocumento(formData.documento, formData.tipoCliente)}
                      onChange={(e) => handleInputChange("documento", e.target.value)}
                      placeholder={formData.tipoCliente === "PF" ? "000.000.000-00" : "00.000.000/0000-00"}
                      maxLength={formData.tipoCliente === "PF" ? 14 : 18}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="razaoSocial">
                    {formData.tipoCliente === "PF" ? "Nome Completo" : "Razão Social"} *
                  </Label>
                  <Input
                    id="razaoSocial"
                    value={formData.razaoSocial}
                    onChange={(e) => handleInputChange("razaoSocial", e.target.value)}
                    placeholder={formData.tipoCliente === "PF" ? "Nome completo" : "Razão social da empresa"}
                  />
                </div>

                {formData.tipoCliente === "PJ" && (
                  <div className="space-y-2">
                    <Label htmlFor="nomeFantasia">Nome Fantasia</Label>
                    <Input
                      id="nomeFantasia"
                      value={formData.nomeFantasia}
                      onChange={(e) => handleInputChange("nomeFantasia", e.target.value)}
                      placeholder="Nome fantasia (opcional)"
                    />
                  </div>
                )}

                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="nomeContato">Nome do Contato *</Label>
                    <Input
                      id="nomeContato"
                      value={formData.nomeContato}
                      onChange={(e) => handleInputChange("nomeContato", e.target.value)}
                      placeholder="Nome do responsável"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">E-mail *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="email@exemplo.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="telefone">Telefone *</Label>
                    <Input
                      id="telefone"
                      value={formData.telefone}
                      onChange={(e) => handleInputChange("telefone", e.target.value)}
                      placeholder="(11) 99999-9999"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Endereço
                </CardTitle>
                <CardDescription>
                  Localização física do cliente
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="cep">CEP *</Label>
                    <Input
                      id="cep"
                      value={formData.cep}
                      onChange={(e) => handleCepChange(e.target.value)}
                      placeholder="00000-000"
                      maxLength={8}
                      disabled={buscandoCep}
                    />
                    {buscandoCep && <p className="text-sm text-muted-foreground">Buscando...</p>}
                  </div>

                  <div className="md:col-span-2 space-y-2">
                    <Label htmlFor="logradouro">Logradouro *</Label>
                    <Input
                      id="logradouro"
                      value={formData.logradouro}
                      onChange={(e) => handleInputChange("logradouro", e.target.value)}
                      placeholder="Rua, Avenida, etc."
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="numero">Número *</Label>
                    <Input
                      id="numero"
                      value={formData.numero}
                      onChange={(e) => handleInputChange("numero", e.target.value)}
                      placeholder="123"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bairro">Bairro *</Label>
                    <Input
                      id="bairro"
                      value={formData.bairro}
                      onChange={(e) => handleInputChange("bairro", e.target.value)}
                      placeholder="Bairro"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="regiao">Região</Label>
                    <Input
                      id="regiao"
                      value={formData.regiao}
                      onChange={(e) => handleInputChange("regiao", e.target.value)}
                      placeholder="Região (opcional)"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="uf">UF *</Label>
                    <Input
                      id="uf"
                      value={formData.uf}
                      onChange={(e) => handleInputChange("uf", e.target.value)}
                      placeholder="SP"
                      maxLength={2}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cidade">Cidade *</Label>
                  <Input
                    id="cidade"
                    value={formData.cidade}
                    onChange={(e) => handleInputChange("cidade", e.target.value)}
                    placeholder="Nome da cidade"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Coluna Lateral - Status e Localização */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  Status
                </CardTitle>
                <CardDescription>
                  Define se o cliente está ativo
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="ativo"
                    checked={formData.ativo}
                    onCheckedChange={(checked) => handleInputChange("ativo", checked)}
                  />
                  <Label htmlFor="ativo">
                    Cliente {formData.ativo ? "Ativo" : "Inativo"}
                  </Label>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Localização Geográfica
                </CardTitle>
                <CardDescription>
                  Coordenadas para roteirização
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="latitude">Latitude</Label>
                  <Input
                    id="latitude"
                    value={formData.latitude}
                    onChange={(e) => handleInputChange("latitude", e.target.value)}
                    placeholder="-23.5505"
                    type="number"
                    step="any"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="longitude">Longitude</Label>
                  <Input
                    id="longitude"
                    value={formData.longitude}
                    onChange={(e) => handleInputChange("longitude", e.target.value)}
                    placeholder="-46.6333"
                    type="number"
                    step="any"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-muted/50">
              <CardContent className="pt-6">
                <div className="text-center space-y-2">
                  <div className="text-2xl font-bold text-primary">248</div>
                  <p className="text-sm text-muted-foreground">Clientes Cadastrados</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <Button type="button" variant="outline">
            Cancelar
          </Button>
          <Button type="submit" className="flex items-center gap-2">
            <Save className="h-4 w-4" />
            Salvar Cliente
          </Button>
        </div>
      </form>
    </div>
  );
}
