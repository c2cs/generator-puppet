# == Class: <%= ans.projectName %>
#
# <%= ans.desc %>
#
# === Parameters:
#
# [*example*]
#   An example param.
#   Default: "foo bar"
#
# === Examples
#
# include <%= ans.projectName %>
#
# class { '<%= ans.projectName %>':
#   example => 'foo bar'
# }
#
# === Authors
#
# <%= ans.fullName %>
#
# === Copyright
#
# Copyright <%= ans.fullName %>, unless otherwise noted.
#
class <%= ans.projectName %>( $example = 'foo bar' ) {

  # Class code here

}
