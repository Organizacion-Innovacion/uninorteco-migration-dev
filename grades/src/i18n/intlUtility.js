/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */

function getAllMessagesFrom(requireContext) {
  const rawData = requireContext.keys().map(requireContext);
  const messages = Object.assign({}, ...rawData);
  return messages;
}

export const getMessages = (userLocale) => {
  const baseMessages = getAllMessagesFrom(
    require.context("../strings/es", false, /.json$/)
  );

  try {
    const actionLanguage = userLocale.split(/[-_]/)[0];
    if (actionLanguage === "en") {
      const localeMessages = getAllMessagesFrom(
        require.context("../strings/en", false, /.json$/)
      );
      return { ...baseMessages, ...localeMessages };
    }
    // This userLocale is not supported.
    return baseMessages;
  } catch (error) {
    // This userLocale is not supported.
    return baseMessages;
  }
};
