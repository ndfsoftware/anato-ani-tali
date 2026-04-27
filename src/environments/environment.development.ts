const runtimeEnv = ((import.meta as { env?: Record<string, string | undefined> }).env ?? {}) as Record<
  string,
  string | undefined
>;

export const environment = {
  DEV: 'Nicolas Di Fabio',
  LINKEDIN: 'https://www.linkedin.com/in/nicolas-di-fabio/',
  INSTAGRAM: 'https://www.instagram.com/catedra4/',
  TITLE: 'Bienvenidos a Anatomía con Ani y Tali',
  CONTACT_EMAIL: runtimeEnv['NG_APP_CONTACT_EMAIL'] ?? 'anatoaniytali@gmail.com',
  EMAILJS_PUBLIC_KEY: runtimeEnv['NG_APP_EMAILJS_PUBLIC_KEY'] ?? '',
  EMAILJS_SERVICE_ID: runtimeEnv['NG_APP_EMAILJS_SERVICE_ID'] ?? '',
  EMAILJS_TEMPLATE_ID: runtimeEnv['NG_APP_EMAILJS_TEMPLATE_ID'] ?? '',
};
