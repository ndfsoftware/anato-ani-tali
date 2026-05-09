import { isPlatformServer } from '@angular/common';
import { inject, InjectionToken, makeStateKey, PLATFORM_ID, TransferState } from '@angular/core';

export interface RuntimeConfig {
  contactEmail: string;
  emailjsPublicKey: string;
  emailjsServiceId: string;
  emailjsTemplateId: string;
  overview: string;
  introduction: string;
  siteUrl: string;
}

type RuntimeEnvValues = Record<string, string | undefined>;

const DEFAULT_RUNTIME_CONFIG: RuntimeConfig = {
  contactEmail: '',
  emailjsPublicKey: '',
  emailjsServiceId: '',
  emailjsTemplateId: '',
  overview: '',
  introduction: '',
  siteUrl: 'https://anatoanitali.com',
};

const RUNTIME_CONFIG_STATE_KEY = makeStateKey<RuntimeConfig>('runtime-config');

function readGlobalRuntimeEnv(): RuntimeEnvValues {
  return ((globalThis as { __APP_ENV__?: RuntimeEnvValues }).__APP_ENV__ ?? {}) as RuntimeEnvValues;
}

function readProcessEnv(): RuntimeEnvValues {
  const maybeProcess = globalThis as typeof globalThis & {
    process?: { env?: RuntimeEnvValues };
  };

  return maybeProcess.process?.env ?? {};
}

function readRuntimeValue(key: string): string | undefined {
  const processValue = readProcessEnv()[key];
  if (processValue !== undefined && processValue !== '') {
    return processValue;
  }

  const globalValue = readGlobalRuntimeEnv()[key];
  if (globalValue !== undefined && globalValue !== '') {
    return globalValue;
  }

  return undefined;
}

function resolveRuntimeConfig(): RuntimeConfig {
  return {
    contactEmail: readRuntimeValue('NG_APP_CONTACT_EMAIL') ?? DEFAULT_RUNTIME_CONFIG.contactEmail,
    emailjsPublicKey: readRuntimeValue('NG_APP_EMAILJS_PUBLIC_KEY') ?? '',
    emailjsServiceId: readRuntimeValue('NG_APP_EMAILJS_SERVICE_ID') ?? '',
    emailjsTemplateId: readRuntimeValue('NG_APP_EMAILJS_TEMPLATE_ID') ?? '',
    siteUrl: readRuntimeValue('NG_APP_SITE_URL') ?? DEFAULT_RUNTIME_CONFIG.siteUrl,
    overview: readRuntimeValue('NG_APP_OVERVIEW') ?? DEFAULT_RUNTIME_CONFIG.overview,
    introduction: readRuntimeValue('NG_APP_INTRODUCTION') ?? DEFAULT_RUNTIME_CONFIG.introduction,
  };
}

function runtimeConfigFactory(): RuntimeConfig {
  const transferState = inject(TransferState);
  const platformId = inject(PLATFORM_ID);

  if (transferState.hasKey(RUNTIME_CONFIG_STATE_KEY)) {
    return transferState.get(RUNTIME_CONFIG_STATE_KEY, DEFAULT_RUNTIME_CONFIG);
  }

  const config = resolveRuntimeConfig();

  if (isPlatformServer(platformId)) {
    transferState.set(RUNTIME_CONFIG_STATE_KEY, config);
  }

  return config;
}

export const RUNTIME_CONFIG = new InjectionToken<RuntimeConfig>('RUNTIME_CONFIG', {
  providedIn: 'root',
  factory: runtimeConfigFactory,
});
