import entityResolutionsData from '../data/entity_resolutions.json';
import type { EntityResolutionMatch } from '../types';

export class EntityResolutionEngine {
  private clusters: EntityResolutionMatch[];

  constructor() {
    this.clusters = entityResolutionsData as EntityResolutionMatch[];
  }

  public getClusters(): EntityResolutionMatch[] {
    return this.clusters;
  }

  public getClusterById(clusterId: string): EntityResolutionMatch | undefined {
    return this.clusters.find(c => c.clusterId === clusterId);
  }

  /**
   * Levenshtein distance computation
   */
  public levenshteinDistance(s1: string, s2: string): number {
    const a = s1.toLowerCase();
    const b = s2.toLowerCase();
    const matrix: number[][] = [];

    for (let i = 0; i <= b.length; i++) {
      matrix[i] = [i];
    }
    for (let j = 0; j <= a.length; j++) {
      matrix[0][j] = j;
    }

    for (let i = 1; i <= b.length; i++) {
      for (let j = 1; j <= a.length; j++) {
        if (b.charAt(i - 1) === a.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1, // substitution
            Math.min(
              matrix[i][j - 1] + 1,   // insertion
              matrix[i - 1][j] + 1    // deletion
            )
          );
        }
      }
    }

    return matrix[b.length][a.length];
  }

  /**
   * Calculate string similarity score (0 to 1)
   */
  public stringSimilarity(s1: string, s2: string): number {
    const longer = s1.length > s2.length ? s1 : s2;
    const shorter = s1.length > s2.length ? s2 : s1;
    if (longer.length === 0) return 1.0;
    
    // Check abbreviation or acronym match (e.g. "Raza Khan" vs "RK" or "R. Khan")
    const words = longer.toLowerCase().split(/\s+/);
    const initials = words.map(w => w[0]).join('');
    if (shorter.toLowerCase().replace(/[^a-z]/g, '') === initials) {
      return 0.88;
    }

    const editDistance = this.levenshteinDistance(longer, shorter);
    return Math.max(0, (longer.length - editDistance) / longer.length);
  }

  /**
   * Multi-faceted resolution score calculator
   */
  public calculateMultiFacetedResolution(
    name1: string,
    name2: string,
    hasSharedPhone: boolean = false,
    hasSharedLocation: boolean = false,
    hasSharedAccount: boolean = false,
    hasSharedIntelMemo: boolean = false
  ) {
    const stringSim = this.stringSimilarity(name1, name2);
    let weightedScore = stringSim * 0.35;

    if (hasSharedPhone) weightedScore += 0.30;
    if (hasSharedLocation) weightedScore += 0.15;
    if (hasSharedAccount) weightedScore += 0.10;
    if (hasSharedIntelMemo) weightedScore += 0.10;

    return {
      confidence: Math.min(0.99, Number(weightedScore.toFixed(3))),
      stringSimilarity: Number(stringSim.toFixed(2)),
      factors: {
        phoneticMatch: stringSim > 0.6,
        telephonyCooccurrence: hasSharedPhone,
        spatialProximity: hasSharedLocation,
        financialRemittance: hasSharedAccount,
        intelCorrelation: hasSharedIntelMemo
      }
    };
  }
}

export const entityResolutionEngine = new EntityResolutionEngine();
