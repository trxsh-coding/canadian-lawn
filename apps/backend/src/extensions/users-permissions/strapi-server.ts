const PROFILE_EDITABLE_FIELDS = [
  'firstname',
  'lastname',
  'patronymic',
  'email',
  'phone',
  'address',
  'consent_personal_data',
  'consent_marketing',
] as const;

/**
 * The plugin's default `PUT /users/:id` lets any authenticated user with the
 * `update` permission edit *any* user by id, with no field restrictions
 * (role/confirmed/blocked/password included). Since the profile form only
 * needs self-service edits, this narrows it to "update your own profile" and
 * strips the body down to a safe field whitelist before delegating.
 */
export default (plugin: Record<string, Record<string, unknown>>) => {
  const controller = plugin.controllers.user as Record<string, (ctx: unknown) => Promise<unknown>>;
  const defaultUpdate = controller.update;

  controller.update = async (ctx) => {
    const { state, params, request } = ctx as {
      state: { user?: { id: number | string } };
      params: { id: string };
      request: { body: Record<string, unknown> };
    };

    if (!state.user || String(state.user.id) !== String(params.id)) {
      return (ctx as { forbidden: (msg: string) => unknown }).forbidden(
        'You can only update your own profile'
      );
    }

    request.body = Object.fromEntries(
      Object.entries(request.body).filter(([key]) =>
        (PROFILE_EDITABLE_FIELDS as readonly string[]).includes(key)
      )
    );

    return defaultUpdate(ctx);
  };

  return plugin;
};
