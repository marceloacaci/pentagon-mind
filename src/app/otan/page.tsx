import type { Metadata } from 'next';
import { Card, CardHeader, CardBody } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { GlossaryInspector } from '@/components/ui/GlossaryInspector';

export const metadata: Metadata = {
  title: 'OTAN, Artigo 5 e Alianças do Indo-Pacífico',
  description: 'A OTAN, o Artigo 5 de defesa coletiva e as alianças do Indo-Pacífico (AUKUS, Quad, alianças bilaterais).',
};

const ALLIANCES = [
  { name: 'OTAN (NATO)', desc: 'Aliança transatlântica fundada em 1949. O Artigo 5 estabelece que um ataque a um é um ataque a todos.', tag: 'Artigo 5' },
  { name: 'AUKUS', desc: 'Pacto trilateral (EUA, Reino Unido, Austrália) de segurança no Indo-Pacífico e submarinos nucleares.', tag: 'Indo-Pacífico' },
  { name: 'Quad (QUAD)', desc: 'Diálogo EUA-Japão-Índia-Austrália para um Indo-Pacífico livre e aberto.', tag: 'Indo-Pacífico' },
  { name: 'Tratado EUA-Japão', desc: 'Defesa mútua; base da presença do 7º CSG e das Forças de Autodefesa.', tag: 'Bilateral' },
  { name: 'Tratado EUA-Coreia', desc: 'Defesa mútua desde 1953; USFK com 28.500 militares.', tag: 'Bilateral' },
  { name: 'Tratado EUA-Filipinas', desc: 'Defesa mútua desde 1951; base das FONOPS no Mar do Sul da China.', tag: 'Bilateral' },
];

export default function OtanPage() {
  return (
    <div className="space-y-6">
      <header>
        <Badge variant="military">ALIANÇAS</Badge>
        <h1 className="section-title mt-2">OTAN, Artigo 5 e Alianças do Indo-Pacífico</h1>
        <p className="muted mt-1">
          <GlossaryInspector text="O Artigo 5 da OTAN é o núcleo da defesa coletiva; no Indo-Pacífico, AUKUS e Quad estendem a dissuasão integrada." />
        </p>
      </header>

      <section>
        <Card className="p-4">
          <CardHeader title="Artigo 5 — Defesa Coletiva" subtitle="Tratado do Atlântico Norte (1949)" />
          <CardBody>
            <p>
              As Partes convêm que um ataque armado contra uma ou mais delas, na Europa ou América do
              Norte, será considerado um ataque contra todas. Esta cláusula foi invocada uma única vez,
              após os ataques de 11 de setembro de 2001.
            </p>
          </CardBody>
        </Card>
      </section>

      <section>
        <h2 className="mb-3 font-display text-lg font-semibold text-slate-100">Alianças Chave</h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {ALLIANCES.map((a) => (
            <Card key={a.name} className="p-4">
              <div className="mb-1 flex items-center justify-between">
                <CardHeader title={a.name} />
                <Badge variant="outline">{a.tag}</Badge>
              </div>
              <CardBody>{a.desc}</CardBody>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
