import { Settings, SettingsSection } from 'app/types';

import { AuthProviderInfo } from './types';

export * from './types';

const registeredAuthProviders: AuthProviderInfo[] = [
  // { id: 'azuread', displayName: 'Azure AD OAuth2' },
  // { id: 'generic_oauth', displayName: 'OAuht2' },
  // { id: 'github', displayName: 'GitHub OAuth2' },
  // { id: 'gitlab', displayName: 'GitLab OAuth2' },
  // { id: 'google', displayName: 'Google OAuth2' },
  // { id: 'grafana_com', displayName: 'grafana.com OAuth2' },
  // { id: 'jwt', displayName: 'JWT' },
  // { id: 'okta', displayName: 'Okta OAuht2' },
];

export function registerAuthProvider(provider: AuthProviderInfo) {
  if (!registeredAuthProviders.find((p) => p.id === provider.id)) {
    registeredAuthProviders.push(provider);
  }
}

export function getRegisteredAuthProviders(): AuthProviderInfo[] {
  return registeredAuthProviders;
}

export function getAuthProviderInfo(provider: string) {
  return registeredAuthProviders.find((p) => p.id === provider);
}

export function getAuthProviders(cfg: Settings): SettingsSection[] {
  const providers: SettingsSection[] = [];
  for (const section in cfg) {
    if (Object.prototype.hasOwnProperty.call(cfg, section)) {
      const sectionConfig = cfg[section];
      const provider = registeredAuthProviders.find((provider) => `auth.${provider.id}` === section);
      if (provider) {
        const providerData = {
          ...sectionConfig,
          providerId: provider.id,
          displayName: sectionConfig.name || provider.displayName,
        };
        providers.push(providerData);
      }
    }
  }
  return providers;
}
