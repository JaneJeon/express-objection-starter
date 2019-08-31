;(function() {
  var template = Handlebars.template,
    templates = (Handlebars.templates = Handlebars.templates || {})
  templates['password-reset/html'] = template({
    compiler: [7, '>= 4.0.0'],
    main: function(container, depth0, helpers, partials, data) {
      var stack1,
        helper,
        alias1 = depth0 != null ? depth0 : container.nullContext || {},
        alias2 = helpers.helperMissing,
        alias3 = 'function'

      return (
        '<!doctype html>\n<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">\n\n<head>\n  <title>\n  </title>\n  <!--[if !mso]><!-- -->\n  <meta http-equiv="X-UA-Compatible" content="IE=edge">\n  <!--<![endif]-->\n  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1">\n  <style type="text/css">\n    #outlook a {\n      padding: 0;\n    }\n\n    body {\n      margin: 0;\n      padding: 0;\n      -webkit-text-size-adjust: 100%;\n      -ms-text-size-adjust: 100%;\n    }\n\n    table,\n    td {\n      border-collapse: collapse;\n      mso-table-lspace: 0pt;\n      mso-table-rspace: 0pt;\n    }\n\n    img {\n      border: 0;\n      height: auto;\n      line-height: 100%;\n      outline: none;\n      text-decoration: none;\n      -ms-interpolation-mode: bicubic;\n    }\n\n    p {\n      display: block;\n      margin: 13px 0;\n    }\n  </style>\n  <!--[if mso]>\n        <xml>\n        <o:OfficeDocumentSettings>\n          <o:AllowPNG/>\n          <o:PixelsPerInch>96</o:PixelsPerInch>\n        </o:OfficeDocumentSettings>\n        </xml>\n        <![endif]-->\n  <!--[if lte mso 11]>\n        <style type="text/css">\n          .outlook-group-fix { width:100% !important; }\n        </style>\n        <![endif]-->\n  <style type="text/css">\n    @media only screen and (min-width:480px) {\n      .mj-column-per-100 {\n        width: 100% !important;\n        max-width: 100%;\n      }\n    }\n  </style>\n  <style type="text/css">\n  </style>\n</head>\n\n<body>\n  <div style="">\n    <!--[if mso | IE]>\n      <table\n         align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600"\n      >\n        <tr>\n          <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">\n      <![endif]-->\n    <div style="margin:0px auto;max-width:600px;">\n      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">\n        <tbody>\n          <tr>\n            <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;">\n              <!--[if mso | IE]>\n                  <table role="presentation" border="0" cellpadding="0" cellspacing="0">\n                \n        <tr>\n      \n            <td\n               class="" style="vertical-align:top;width:600px;"\n            >\n          <![endif]-->\n              <div class="mj-column-per-100 outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">\n                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">\n                  <tr>\n                    <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">\n                      <div style="font-family:Helvetica;font-size:18px;line-height:1;text-align:left;color:#000000;">Hi ' +
        container.escapeExpression(
          ((helper =
            (helper =
              helpers.username ||
              (depth0 != null ? depth0.username : depth0)) != null
              ? helper
              : alias2),
          typeof helper === alias3
            ? helper.call(alias1, { name: 'username', hash: {}, data: data })
            : helper)
        ) +
        ', We received a request to reset your password. To set a new password, click this button:</div>\n                    </td>\n                  </tr>\n                  <tr>\n                    <td align="center" vertical-align="middle" style="font-size:0px;padding:10px 25px;word-break:break-word;">\n                      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:separate;line-height:100%;">\n                        <tr>\n                          <td align="center" bgcolor="#414141" role="presentation" style="border:none;border-radius:3px;cursor:auto;mso-padding-alt:10px 25px;background:#414141;" valign="middle">\n                            <a href="' +
        ((stack1 =
          ((helper =
            (helper =
              helpers.link || (depth0 != null ? depth0.link : depth0)) != null
              ? helper
              : alias2),
          typeof helper === alias3
            ? helper.call(alias1, { name: 'link', hash: {}, data: data })
            : helper)) != null
          ? stack1
          : '') +
        '" style="display:inline-block;background:#414141;color:#ffffff;font-family:Helvetica;font-size:18px;font-weight:normal;line-height:120%;margin:0;text-decoration:none;text-transform:none;padding:10px 25px;mso-padding-alt:0px;border-radius:3px;" target="_blank"> Reset Password </a>\n                          </td>\n                        </tr>\n                      </table>\n                    </td>\n                  </tr>\n                  <tr>\n                    <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">\n                      <div style="font-family:Helvetica;font-size:18px;line-height:1;text-align:left;color:#000000;">If you did not request this, ignore this email and the link will expire on its own.</div>\n                    </td>\n                  </tr>\n                </table>\n              </div>\n              <!--[if mso | IE]>\n            </td>\n          \n        </tr>\n      \n                  </table>\n                <![endif]-->\n            </td>\n          </tr>\n        </tbody>\n      </table>\n    </div>\n    <!--[if mso | IE]>\n          </td>\n        </tr>\n      </table>\n      <![endif]-->\n  </div>\n</body>\n\n</html>'
      )
    },
    useData: true
  })
  templates['password-reset/subject'] = template({
    compiler: [7, '>= 4.0.0'],
    main: function(container, depth0, helpers, partials, data) {
      return 'Password reset request\n'
    },
    useData: true
  })
  templates['password-reset/text'] = template({
    compiler: [7, '>= 4.0.0'],
    main: function(container, depth0, helpers, partials, data) {
      var stack1,
        helper,
        alias1 = depth0 != null ? depth0 : container.nullContext || {},
        alias2 = helpers.helperMissing,
        alias3 = 'function'

      return (
        'Hi ' +
        container.escapeExpression(
          ((helper =
            (helper =
              helpers.username ||
              (depth0 != null ? depth0.username : depth0)) != null
              ? helper
              : alias2),
          typeof helper === alias3
            ? helper.call(alias1, { name: 'username', hash: {}, data: data })
            : helper)
        ) +
        ', We received a request to reset your password. To set a new password, click this link:\n' +
        ((stack1 =
          ((helper =
            (helper =
              helpers.link || (depth0 != null ? depth0.link : depth0)) != null
              ? helper
              : alias2),
          typeof helper === alias3
            ? helper.call(alias1, { name: 'link', hash: {}, data: data })
            : helper)) != null
          ? stack1
          : '') +
        '\nIf you did not request this, ignore this email and the link will expire on its own.\n'
      )
    },
    useData: true
  })
  templates['verify-email/html'] = template({
    compiler: [7, '>= 4.0.0'],
    main: function(container, depth0, helpers, partials, data) {
      var stack1,
        helper,
        alias1 = depth0 != null ? depth0 : container.nullContext || {},
        alias2 = helpers.helperMissing,
        alias3 = 'function'

      return (
        '<!doctype html>\n<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">\n\n<head>\n  <title>\n  </title>\n  <!--[if !mso]><!-- -->\n  <meta http-equiv="X-UA-Compatible" content="IE=edge">\n  <!--<![endif]-->\n  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1">\n  <style type="text/css">\n    #outlook a {\n      padding: 0;\n    }\n\n    body {\n      margin: 0;\n      padding: 0;\n      -webkit-text-size-adjust: 100%;\n      -ms-text-size-adjust: 100%;\n    }\n\n    table,\n    td {\n      border-collapse: collapse;\n      mso-table-lspace: 0pt;\n      mso-table-rspace: 0pt;\n    }\n\n    img {\n      border: 0;\n      height: auto;\n      line-height: 100%;\n      outline: none;\n      text-decoration: none;\n      -ms-interpolation-mode: bicubic;\n    }\n\n    p {\n      display: block;\n      margin: 13px 0;\n    }\n  </style>\n  <!--[if mso]>\n        <xml>\n        <o:OfficeDocumentSettings>\n          <o:AllowPNG/>\n          <o:PixelsPerInch>96</o:PixelsPerInch>\n        </o:OfficeDocumentSettings>\n        </xml>\n        <![endif]-->\n  <!--[if lte mso 11]>\n        <style type="text/css">\n          .outlook-group-fix { width:100% !important; }\n        </style>\n        <![endif]-->\n  <style type="text/css">\n    @media only screen and (min-width:480px) {\n      .mj-column-per-100 {\n        width: 100% !important;\n        max-width: 100%;\n      }\n    }\n  </style>\n  <style type="text/css">\n  </style>\n</head>\n\n<body>\n  <div style="">\n    <!--[if mso | IE]>\n      <table\n         align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600"\n      >\n        <tr>\n          <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">\n      <![endif]-->\n    <div style="margin:0px auto;max-width:600px;">\n      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">\n        <tbody>\n          <tr>\n            <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;">\n              <!--[if mso | IE]>\n                  <table role="presentation" border="0" cellpadding="0" cellspacing="0">\n                \n        <tr>\n      \n            <td\n               class="" style="vertical-align:top;width:600px;"\n            >\n          <![endif]-->\n              <div class="mj-column-per-100 outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">\n                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">\n                  <tr>\n                    <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">\n                      <div style="font-family:Helvetica;font-size:18px;line-height:1;text-align:left;color:#000000;">Hi ' +
        container.escapeExpression(
          ((helper =
            (helper =
              helpers.username ||
              (depth0 != null ? depth0.username : depth0)) != null
              ? helper
              : alias2),
          typeof helper === alias3
            ? helper.call(alias1, { name: 'username', hash: {}, data: data })
            : helper)
        ) +
        ', thanks for signing up! To finish setting up your account, we just need you to verify your email address by clicking this button:</div>\n                    </td>\n                  </tr>\n                  <tr>\n                    <td align="center" vertical-align="middle" style="font-size:0px;padding:10px 25px;word-break:break-word;">\n                      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:separate;line-height:100%;">\n                        <tr>\n                          <td align="center" bgcolor="#414141" role="presentation" style="border:none;border-radius:3px;cursor:auto;mso-padding-alt:10px 25px;background:#414141;" valign="middle">\n                            <a href="' +
        ((stack1 =
          ((helper =
            (helper =
              helpers.link || (depth0 != null ? depth0.link : depth0)) != null
              ? helper
              : alias2),
          typeof helper === alias3
            ? helper.call(alias1, { name: 'link', hash: {}, data: data })
            : helper)) != null
          ? stack1
          : '') +
        '" style="display:inline-block;background:#414141;color:#ffffff;font-family:Helvetica;font-size:18px;font-weight:normal;line-height:120%;margin:0;text-decoration:none;text-transform:none;padding:10px 25px;mso-padding-alt:0px;border-radius:3px;" target="_blank"> Verify Email </a>\n                          </td>\n                        </tr>\n                      </table>\n                    </td>\n                  </tr>\n                </table>\n              </div>\n              <!--[if mso | IE]>\n            </td>\n          \n        </tr>\n      \n                  </table>\n                <![endif]-->\n            </td>\n          </tr>\n        </tbody>\n      </table>\n    </div>\n    <!--[if mso | IE]>\n          </td>\n        </tr>\n      </table>\n      <![endif]-->\n  </div>\n</body>\n\n</html>'
      )
    },
    useData: true
  })
  templates['verify-email/subject'] = template({
    compiler: [7, '>= 4.0.0'],
    main: function(container, depth0, helpers, partials, data) {
      return 'Verify your email address\n'
    },
    useData: true
  })
  templates['verify-email/text'] = template({
    compiler: [7, '>= 4.0.0'],
    main: function(container, depth0, helpers, partials, data) {
      var stack1,
        helper,
        alias1 = depth0 != null ? depth0 : container.nullContext || {},
        alias2 = helpers.helperMissing,
        alias3 = 'function'

      return (
        'Hi ' +
        container.escapeExpression(
          ((helper =
            (helper =
              helpers.username ||
              (depth0 != null ? depth0.username : depth0)) != null
              ? helper
              : alias2),
          typeof helper === alias3
            ? helper.call(alias1, { name: 'username', hash: {}, data: data })
            : helper)
        ) +
        ', thanks for signing up!\nTo finish setting up your account, we just need you to verify your email address by clicking this link:\n' +
        ((stack1 =
          ((helper =
            (helper =
              helpers.link || (depth0 != null ? depth0.link : depth0)) != null
              ? helper
              : alias2),
          typeof helper === alias3
            ? helper.call(alias1, { name: 'link', hash: {}, data: data })
            : helper)) != null
          ? stack1
          : '') +
        '\n'
      )
    },
    useData: true
  })
})()
