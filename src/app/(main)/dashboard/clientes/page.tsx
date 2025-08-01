
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/data-table/data-table";
import { DataTablePagination } from "@/components/data-table/data-table-pagination";
import { DataTableViewOptions } from "@/components/data-table/data-table-view-options";
import { useDataTableInstance } from "@/hooks/use-data-table-instance";
import { 
  Users, 
  Plus, 
  Edit, 
  Eye, 
  Trash2, 
  Search,
  Building2,
  User,
  MapPin,
  Phone,
  Mail
} from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";

// Tipo para os dados dos clientes
interface Cliente {
  id: string;
  tipo: "PF" | "PJ";
  documento: string;
  nome: string;
  nomeFantasia?: string;
  contato: string;
  email: string;
  telefone: string;
  cidade: string;
  uf: string;
  status: "Ativo" | "Inativo";
  ultimaAtualizacao: string;
}

// Dados mock para demonstração
const clientesData: Cliente[] = [
  {
    id: "001",
    tipo: "PJ",
    documento: "12.345.678/0001-90",
    nome: "Tech Solutions Ltda",
    nomeFantasia: "TechSol",
    contato: "João Silva",
    email: "joao@techsol.com",
    telefone: "(11) 99999-1234",
    cidade: "São Paulo",
    uf: "SP",
    status: "Ativo",
    ultimaAtualizacao: "2024-01-15"
  },
  {
    id: "002",
    tipo: "PF",
    documento: "123.456.789-00",
    nome: "Maria Santos",
    contato: "Maria Santos",
    email: "maria@email.com",
    telefone: "(11) 88888-5678",
    cidade: "Rio de Janeiro",
    uf: "RJ",
    status: "Ativo",
    ultimaAtualizacao: "2024-01-14"
  },
  {
    id: "003",
    tipo: "PJ",
    documento: "98.765.432/0001-11",
    nome: "Comércio ABC S.A.",
    nomeFantasia: "ABC Store",
    contato: "Pedro Costa",
    email: "pedro@abc.com",
    telefone: "(11) 77777-9012",
    cidade: "Belo Horizonte",
    uf: "MG",
    status: "Inativo",
    ultimaAtualizacao: "2024-01-10"
  },
  {
    id: "004",
    tipo: "PF",
    documento: "987.654.321-11",
    nome: "Carlos Oliveira",
    contato: "Carlos Oliveira",
    email: "carlos@email.com",
    telefone: "(11) 66666-3456",
    cidade: "Curitiba",
    uf: "PR",
    status: "Ativo",
    ultimaAtualizacao: "2024-01-12"
  }
];

// Definição das colunas da tabela
const clientesColumns: ColumnDef<Cliente>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Selecionar todos"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Selecionar linha"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: ({ column }) => <DataTableColumnHeader column={column} title="ID" />,
    cell: ({ row }) => <span className="font-mono">{row.original.id}</span>,
    enableHiding: false,
  },
  {
    accessorKey: "tipo",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Tipo" />,
    cell: ({ row }) => (
      <Badge variant={row.original.tipo === "PJ" ? "default" : "secondary"} className="flex items-center gap-1 w-fit">
        {row.original.tipo === "PJ" ? <Building2 className="h-3 w-3" /> : <User className="h-3 w-3" />}
        {row.original.tipo}
      </Badge>
    ),
    enableSorting: false,
  },
  {
    accessorKey: "documento",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Documento" />,
    cell: ({ row }) => <span className="font-mono text-sm">{row.original.documento}</span>,
  },
  {
    accessorKey: "nome",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Nome/Razão Social" />,
    cell: ({ row }) => (
      <div>
        <div className="font-medium">{row.original.nome}</div>
        {row.original.nomeFantasia && (
          <div className="text-sm text-muted-foreground">{row.original.nomeFantasia}</div>
        )}
      </div>
    ),
    enableHiding: false,
  },
  {
    accessorKey: "contato",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Contato" />,
    cell: ({ row }) => <span>{row.original.contato}</span>,
  },
  {
    accessorKey: "email",
    header: ({ column }) => <DataTableColumnHeader column={column} title="E-mail" />,
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Mail className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm">{row.original.email}</span>
      </div>
    ),
  },
  {
    accessorKey: "telefone",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Telefone" />,
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Phone className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-mono">{row.original.telefone}</span>
      </div>
    ),
  },
  {
    accessorKey: "cidade",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Localização" />,
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <MapPin className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm">{row.original.cidade}/{row.original.uf}</span>
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => (
      <Badge variant={row.original.status === "Ativo" ? "default" : "destructive"}>
        {row.original.status}
      </Badge>
    ),
    enableSorting: false,
  },
  {
    accessorKey: "ultimaAtualizacao",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Última Atualização" />,
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground tabular-nums">
        {new Date(row.original.ultimaAtualizacao).toLocaleDateString('pt-BR')}
      </span>
    ),
  },
];

export default function ClientesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClients, setSelectedClients] = useState<string[]>([]);
  const [filteredData, setFilteredData] = useState(clientesData);

  // Filtrar dados baseado na busca usando useEffect
  useEffect(() => {
    const filtered = clientesData.filter(cliente =>
      cliente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cliente.documento.includes(searchTerm) ||
      cliente.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cliente.contato.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
  }, [searchTerm]);

  const table = useDataTableInstance({
    data: filteredData,
    columns: clientesColumns,
    getRowId: (row) => row.id,
  });

  const handleIncluir = () => {
    console.log("Incluir novo cliente");
    // Aqui você redirecionaria para o formulário de cadastro
  };

  const handleAlterar = () => {
    const selected = table.getSelectedRowModel().rows;
    if (selected.length === 1) {
      console.log("Alterar cliente:", selected[0].original);
      // Aqui você redirecionaria para o formulário de edição
    }
  };

  const handleVisualizar = () => {
    const selected = table.getSelectedRowModel().rows;
    if (selected.length === 1) {
      console.log("Visualizar cliente:", selected[0].original);
      // Aqui você abriria um modal ou página de visualização
    }
  };

  const handleExcluir = () => {
    const selected = table.getSelectedRowModel().rows;
    if (selected.length > 0) {
      console.log("Excluir clientes:", selected.map(row => row.original));
      // Aqui você confirmaria e excluiria os clientes selecionados
    }
  };

  const selectedRowsCount = table.getSelectedRowModel().rows.length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Gestão de Clientes</h1>
          <p className="text-muted-foreground">
            Gerencie todos os seus clientes pessoa física e jurídica
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-sm">
            {clientesData.length} clientes cadastrados
          </Badge>
          <Badge variant="secondary" className="text-sm">
            {clientesData.filter(c => c.status === "Ativo").length} ativos
          </Badge>
        </div>
      </div>

      {/* Card Principal */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Lista de Clientes
              </CardTitle>
              <CardDescription>
                Use os botões de ação para gerenciar os clientes selecionados
              </CardDescription>
            </div>
          </div>

          {/* Barra de Ferramentas */}
          <div className="flex flex-col gap-4 pt-4">
            {/* Busca e Filtros */}
            <div className="flex items-center justify-between gap-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por nome, documento, email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <DataTableViewOptions table={table} />
            </div>

            {/* Botões de Ação */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button 
                  onClick={handleIncluir}
                  className="flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Incluir
                </Button>
                
                <Button 
                  variant="outline"
                  onClick={handleAlterar}
                  disabled={selectedRowsCount !== 1}
                  className="flex items-center gap-2"
                >
                  <Edit className="h-4 w-4" />
                  Alterar
                </Button>
                
                <Button 
                  variant="outline"
                  onClick={handleVisualizar}
                  disabled={selectedRowsCount !== 1}
                  className="flex items-center gap-2"
                >
                  <Eye className="h-4 w-4" />
                  Visualizar
                </Button>
                
                <Button 
                  variant="destructive"
                  onClick={handleExcluir}
                  disabled={selectedRowsCount === 0}
                  className="flex items-center gap-2"
                >
                  <Trash2 className="h-4 w-4" />
                  Excluir {selectedRowsCount > 0 && `(${selectedRowsCount})`}
                </Button>
              </div>

              {selectedRowsCount > 0 && (
                <Badge variant="secondary">
                  {selectedRowsCount} cliente(s) selecionado(s)
                </Badge>
              )}
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {/* Tabela de Dados */}
          <div className="space-y-4">
            <DataTable table={table} />
            <DataTablePagination table={table} />
          </div>
        </CardContent>
      </Card>

      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total de Clientes</p>
                <p className="text-2xl font-bold">{clientesData.length}</p>
              </div>
              <Users className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Clientes Ativos</p>
                <p className="text-2xl font-bold text-green-600">
                  {clientesData.filter(c => c.status === "Ativo").length}
                </p>
              </div>
              <User className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pessoa Jurídica</p>
                <p className="text-2xl font-bold text-blue-600">
                  {clientesData.filter(c => c.tipo === "PJ").length}
                </p>
              </div>
              <Building2 className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pessoa Física</p>
                <p className="text-2xl font-bold text-purple-600">
                  {clientesData.filter(c => c.tipo === "PF").length}
                </p>
              </div>
              <User className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
