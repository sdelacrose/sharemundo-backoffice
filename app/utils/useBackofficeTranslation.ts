'use client';

import { useEffect, useMemo, useState } from 'react';

type Locale = 'en' | 'de' | 'fr';

const COPY = {
  en: {
    sidebar: {
      mcpServers: 'MCP Servers',
    },
    aiChatReview: {
      breadcrumbs: {
        integrations: 'MCP Servers',
        review: 'Public MCP Review',
      },
      noContext: 'Sidebar context is unavailable.',
      title: 'Public MCP Review',
      subtitle:
        'Review supplier-submitted MCP endpoints before they become globally selectable.',
      filters: {
        status: 'Status',
        all: 'All',
        pendingReview: 'Pending review',
        approved: 'Approved',
        rejected: 'Rejected',
        revoked: 'Revoked',
        draft: 'Draft',
      },
      buttons: {
        refresh: 'Refresh',
        approve: 'Approve',
        reject: 'Reject',
        revoke: 'Revoke',
        cancel: 'Cancel',
      },
      table: {
        mcp: 'MCP',
        company: 'Company',
        status: 'Status',
        actions: 'Actions',
      },
      empty: 'No publication requests match the current filter.',
      dialog: {
        label: 'Reviewer notes',
        approveTitle: 'Approve MCP submission',
        approveDescription:
          'Add optional reviewer notes for {name} before approving it for platform-wide use.',
        rejectTitle: 'Reject MCP submission',
        rejectDescription:
          'Add reviewer notes for {name}. These notes will be sent back to the submitting company.',
        revokeTitle: 'Revoke public MCP',
        revokeDescription:
          'Add reviewer notes for {name} before revoking its public availability.',
      },
      statuses: {
        draft: 'Draft',
        pending_review: 'Pending review',
        approved: 'Approved',
        rejected: 'Rejected',
        revoked: 'Revoked',
      },
    },
  },
  de: {
    sidebar: {
      mcpServers: 'MCP-Server',
    },
    aiChatReview: {
      breadcrumbs: {
        integrations: 'MCP-Server',
        review: 'Öffentliche MCP-Prüfung',
      },
      noContext: 'Der Sidebar-Kontext ist nicht verfügbar.',
      title: 'Öffentliche MCP-Prüfung',
      subtitle:
        'Prüfen Sie von Lieferanten eingereichte MCP-Endpunkte, bevor sie global auswählbar werden.',
      filters: {
        status: 'Status',
        all: 'Alle',
        pendingReview: 'Ausstehende Prüfung',
        approved: 'Genehmigt',
        rejected: 'Abgelehnt',
        revoked: 'Widerrufen',
        draft: 'Entwurf',
      },
      buttons: {
        refresh: 'Aktualisieren',
        approve: 'Genehmigen',
        reject: 'Ablehnen',
        revoke: 'Widerrufen',
        cancel: 'Abbrechen',
      },
      table: {
        mcp: 'MCP',
        company: 'Unternehmen',
        status: 'Status',
        actions: 'Aktionen',
      },
      empty: 'Keine Veröffentlichungsanfragen entsprechen dem aktuellen Filter.',
      dialog: {
        label: 'Prüfnotizen',
        approveTitle: 'MCP-Einreichung genehmigen',
        approveDescription:
          'Fügen Sie optionale Prüfernotizen für {name} hinzu, bevor Sie es für die plattformweite Nutzung genehmigen.',
        rejectTitle: 'MCP-Einreichung ablehnen',
        rejectDescription:
          'Fügen Sie Prüfernotizen für {name} hinzu. Diese Hinweise werden an das einreichende Unternehmen zurückgesendet.',
        revokeTitle: 'Öffentliches MCP widerrufen',
        revokeDescription:
          'Fügen Sie Prüfernotizen für {name} hinzu, bevor Sie die öffentliche Verfügbarkeit widerrufen.',
      },
      statuses: {
        draft: 'Entwurf',
        pending_review: 'Ausstehende Prüfung',
        approved: 'Genehmigt',
        rejected: 'Abgelehnt',
        revoked: 'Widerrufen',
      },
    },
  },
  fr: {
    sidebar: {
      mcpServers: 'Serveurs MCP',
    },
    aiChatReview: {
      breadcrumbs: {
        integrations: 'Serveurs MCP',
        review: 'Révision publique MCP',
      },
      noContext: 'Le contexte de la barre latérale n’est pas disponible.',
      title: 'Révision publique MCP',
      subtitle:
        'Examinez les points de terminaison MCP soumis par les fournisseurs avant qu’ils ne deviennent sélectionnables globalement.',
      filters: {
        status: 'Statut',
        all: 'Tous',
        pendingReview: 'En attente de révision',
        approved: 'Approuvé',
        rejected: 'Rejeté',
        revoked: 'Révoqué',
        draft: 'Brouillon',
      },
      buttons: {
        refresh: 'Actualiser',
        approve: 'Approuver',
        reject: 'Rejeter',
        revoke: 'Révoquer',
        cancel: 'Annuler',
      },
      table: {
        mcp: 'MCP',
        company: 'Entreprise',
        status: 'Statut',
        actions: 'Actions',
      },
      empty: 'Aucune demande de publication ne correspond au filtre actuel.',
      dialog: {
        label: 'Notes de révision',
        approveTitle: 'Approuver la soumission MCP',
        approveDescription:
          'Ajoutez des notes de révision facultatives pour {name} avant de l’approuver pour une utilisation sur toute la plateforme.',
        rejectTitle: 'Rejeter la soumission MCP',
        rejectDescription:
          'Ajoutez des notes de révision pour {name}. Ces notes seront renvoyées à l’entreprise émettrice.',
        revokeTitle: 'Révoquer le MCP public',
        revokeDescription:
          'Ajoutez des notes de révision pour {name} avant de révoquer sa disponibilité publique.',
      },
      statuses: {
        draft: 'Brouillon',
        pending_review: 'En attente de révision',
        approved: 'Approuvé',
        rejected: 'Rejeté',
        revoked: 'Révoqué',
      },
    },
  },
} as const;

const resolveLocale = (): Locale => {
  if (typeof document !== 'undefined') {
    const documentLang = document.documentElement.lang?.toLowerCase();
    if (documentLang.startsWith('de')) {
      return 'de';
    }
    if (documentLang.startsWith('fr')) {
      return 'fr';
    }
  }

  if (typeof navigator !== 'undefined') {
    const browserLanguage = navigator.language.toLowerCase();
    if (browserLanguage.startsWith('de')) {
      return 'de';
    }
    if (browserLanguage.startsWith('fr')) {
      return 'fr';
    }
  }

  return 'en';
};

const interpolate = (
  template: string,
  values?: Record<string, string | number>,
) => {
  if (!values) {
    return template;
  }

  return Object.entries(values).reduce(
    (message, [key, value]) => message.replaceAll(`{${key}}`, String(value)),
    template,
  );
};

const getValue = (locale: Locale, key: string): string => {
  const value = key
    .split('.')
    .reduce<unknown>((current, part) => {
      if (current && typeof current === 'object' && part in (current as Record<string, unknown>)) {
        return (current as Record<string, unknown>)[part];
      }
      return undefined;
    }, COPY[locale]);

  if (typeof value === 'string') {
    return value;
  }

  return key;
};

const useBackofficeTranslation = () => {
  const [locale, setLocale] = useState<Locale>('en');

  useEffect(() => {
    setLocale(resolveLocale());
  }, []);

  return useMemo(
    () => ({
      locale,
      t: (key: string, values?: Record<string, string | number>) =>
        interpolate(getValue(locale, key), values),
    }),
    [locale],
  );
};

export { useBackofficeTranslation };
