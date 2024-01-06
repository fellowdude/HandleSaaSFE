import { environment } from 'src/environments/environment';

export class Constants {
    public static readonly BACKEND_URL = environment.backend_url;
    public static readonly MIDDLEWARE_URL = environment.middleware_url;
    public static readonly FRONT_KEY = `-----BEGIN RSA PRIVATE KEY-----
    MIIBOgIBAAJBAIu+SitTqEqImZqzFrKkvp58PVbcSGDv/q9l4xkYe24kU5AACSZc
TYRQrfPwL9Sr+VZNgZiZH7AIeV5GEgZG3QMCAwEAAQJABbxfyvt6EuUceO8U5WxB
rrumwOP1zJTNPWHPOn54woKHpW1rEp5elL1SHzDqaPkY2VZirl998xbZ7bphs35p
8QIhAMjcrLQWwu2R4ErmF7QW8gCqoYwWB898tZPxQLaJlMP1AiEAshqTbWuVdDUQ
wcq/xx/LsH4QdDNfOX7Pd+2oVozc+hcCIDW2NQSPVZ7btGOy9cG1pQ8ikcJ5HauR
SKkACXMGhV6FAiAEA49RBvyuSsfe5jfeP/wyNRUf2UyLGi2I0WVa1f/g7wIhAK9B
e2JSos7G96yPpDeA5CcXwxYAYYjqWGwOwpLOqooI
    -----END RSA PRIVATE KEY-----`;
    public static readonly DECRYPT_KEY = `-----BEGIN PUBLIC KEY-----
    MIGeMA0GCSqGSIb3DQEBAQUAA4GMADCBiAKBgHbtnLYGa7S0tLSRbF1Wg470b7xu
    yNQEGbAyrayMw1E51ZOGoIpLJFmE2fbg0an/QiyeV+j8Bjoxg8T5AnyK6nbH6m1g
    5LY7n2MR9CEEnYpnBr/ZKVepqGjszbSacJwpfx0j6vpHleddWRYldkHF9fglf/7f
    IS4zH5ejD3tdsAZnAgMBAAE=
    -----END PUBLIC KEY-----`;
    public static readonly PAYU_KEY = `-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC8Geg3iiGt8SLBVDLvvq/zjGfY
U674tdSdoYxfmEY/ARsmzl2xrTfYQAEK4qcQkOiglx02af48ncbzVNEG1PrVVS99
q9EPUPX/EQ1Hg+zL+ldLTv6U6E/hw8RtKC1lsZwpwAYlJfR0AeqvN7fvuKHYjOEC
cKpqJgPfjtt7g2hiyQIDAQAB
    -----END PUBLIC KEY-----`;
}
