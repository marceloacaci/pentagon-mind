import { describe, it, expect } from 'vitest';
import { buildSearchIndex, searchItems } from './search';
import { arsenalData } from '../data/arsenal';
import { doctrinesData } from '../data/ontology';
import { conflictsData } from '../data/ontology';
import { briefingsData } from '../data/briefings';
import { glossaryData } from '../data/glossary';
import { geopoliticsData } from '../data/geopolitics';

const index = buildSearchIndex({
  weapons: arsenalData,
  doctrines: doctrinesData,
  conflicts: conflictsData,
  briefings: briefingsData,
  glossary: glossaryData,
  geopolitics: geopoliticsData,
});

describe('buildSearchIndex', () => {
  it('indexa todos os itens das coleções', () => {
    expect(index.length).toBe(
      arsenalData.length + doctrinesData.length + conflictsData.length + briefingsData.length + glossaryData.length + geopoliticsData.length,
    );
  });

  it('marca o kind corretamente', () => {
    expect(index.filter((i) => i.kind === 'arma').length).toBe(arsenalData.length);
    expect(index.filter((i) => i.kind === 'glossario').length).toBe(glossaryData.length);
  });
});

describe('searchItems', () => {
  it('retorna vazio para query vazia', () => {
    expect(searchItems(index, { query: '   ' })).toEqual([]);
  });

  it('encontra armas por nome (fuzzy)', () => {
    const r = searchItems(index, { query: 'F-35' });
    expect(r.some((i) => i.title.includes('F-35'))).toBe(true);
  });

  it('encontra glossário por sigla', () => {
    const r = searchItems(index, { query: 'JADC2' });
    expect(r.some((i) => i.kind === 'glossario' && i.id === 'JADC2')).toBe(true);
  });

  it('filtra por kind', () => {
    const r = searchItems(index, { query: 'dissuasão', kinds: ['glossario'] });
    // não deve retornar armas/doutrinas
    expect(r.every((i) => i.kind === 'glossario')).toBe(true);
  });

  it('respeita limite', () => {
    const r = searchItems(index, { query: 'defesa', limit: 3 });
    expect(r.length).toBeLessThanOrEqual(3);
  });

  it('busca facetada por região/tag', () => {
    const r = searchItems(index, { query: 'nuclear' });
    expect(r.length).toBeGreaterThan(0);
  });
});
