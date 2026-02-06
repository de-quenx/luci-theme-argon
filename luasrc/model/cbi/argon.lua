local m = Map("argon", "Argon Theme Style")

s = m:section(TypedSection, "global")
s.anonymous = true

mode = s:option(ListValue, "mode", "Theme Mode")
mode:value("normal", "Normal [Auto]")
mode:value("light", "Light [Terang]")
mode:value("dark", "Dark [Gelap]")
mode.default = "normal"

gaya_theme = s:option(ListValue, "gaya_theme", "Style Theme")
gaya_theme:value("dark", "Dark")
gaya_theme:value("glass", "Glass")
gaya_theme:value("blue", "Blue")
gaya_theme:value("sdark", "SDark")
gaya_theme:value("mint", "Mint")
gaya_theme:value("gold", "Gold")
gaya_theme:value("redx", "RedX")
gaya_theme.default = "glass"

primary = s:option(Value, "primary", "Light/Normal Mode")
primary.placeholder = "#3f5582"
primary.default = "#3f5582"

dark_primary = s:option(Value, "dark_primary", "Dark Mode")
dark_primary.placeholder = "#3f5582"
dark_primary.default = "#3f5582"

return m