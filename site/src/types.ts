import type { TemplateResult } from 'lit';

export interface Page {
  /** URL path, no trailing slash except "/" */
  readonly path: string;
  readonly title: string;
  readonly description: string;
  readonly body: TemplateResult;
  /** Which nav item is current */
  readonly section?: string;
  readonly ogType?: 'website' | 'article';
  readonly image?: string;
  readonly published?: string;
}
