
## Configuració d'un servei i un target de systemd

### Captura 1
S'obre amb `nano` el fitxer `/etc/systemd/system/aaron.target`. Aquest fitxer permet definir un target propi de systemd, és a dir, un conjunt d'unitats que es poden iniciar com un estat del sistema.
![1](imatges/1.png)

### Captura 2
Es configura `aaron.target`: s'indica que és un target personalitzat, que requereix `multi-user.target` i que s'inicia després d'aquest, i es permet aïllar-lo amb `AllowIsolate=yes`. Així es defineix la relació amb el target multiusuari i es pot canviar a aquest estat de manera aïllada.
![2](imatges/2.png)

### Captura 3
S'obre el fitxer `/usr/local/bin/aaron-script.sh`, que serà l'script que executarà el servei configurat més endavant.
![3](imatges/3.png)

### Captura 4
S'escriu el contingut de l'script. Les ordres `echo` hi afegeixen un missatge d'inici, la data (`date`) i l'usuari efectiu (`whoami`) al fitxer `/var/log/aaron-startup.log`. L'objectiu és deixar un registre senzill de cada execució.
![4](imatges/4.png)

### Captura 5
S'executa `sudo chmod +x /usr/local/bin/aaron-script.sh` per donar permís d'execució a l'script. Aquest pas permet que systemd el pugui iniciar com un programa.
![5](imatges/5.png)

### Captura 6
Es crea o s'edita `/etc/systemd/system/aaron.service`, el fitxer d'unitat que descriu com ha d'executar systemd l'script preparat a les captures anteriors.
![6](imatges/6.png)

### Captura 7
Es recarrega la configuració amb `systemctl daemon-reload` i s'habilita `aaron.service`. La sortida confirma la creació de l'enllaç del servei dins de `aaron.target.wants`. Després, `systemctl set-default aaron.target` estableix aquest target com a predeterminat i crea l'enllaç corresponent a `default.target`.
![7](imatges/7.png)

### Captura 8
Es consulta el target predeterminat amb `systemctl get-default` i la resposta és `aaron.target`. Això comprova que s'ha aplicat el canvi fet a la captura anterior.
![8](imatges/8.png)

### Captura 9
Es torna a consultar el target predeterminat i es revisa `aaron.service` amb `systemctl status`. La sortida indica que el servei està carregat i habilitat, i apareix com a `active (exited)` amb `status=0/SUCCESS`: ha acabat correctament i systemd el manté marcat com a actiu. També es mostren missatges d'inici i finalització; la captura no permet confirmar el contingut del fitxer de registre.
![9](imatges/9.png)

### Captura 10
Es mostra la configuració de `aaron.service`. `Type=oneshot` indica que executa una tasca puntual; `ExecStart` assenyala l'script, i `User=root` indica que s'executa com a administrador. `RemainAfterExit=yes` fa que systemd el consideri actiu encara que l'script ja hagi acabat. A `[Install]`, `WantedBy=aaron.target` vincula el servei amb el target personalitzat quan s'habilita.
![10](imatges/10.png)

### Captura 11
S'introdueix `sudo reboot` per reiniciar l'equip i comprovar el comportament de la configuració durant un nou inici. En aquesta captura encara no es mostra el resultat del reinici.
![11](imatges/11.png)

### Captura 12
Es mostra un arbre de dependències que té `aaron.service` com a node principal, seguit d'unitats del sistema com ara `system.slice` i `sysinit.target`. Serveix per consultar les dependències relacionades amb el servei; la captura no mostra l'ordre que ha generat aquesta sortida.
![12](imatges/12.png)

### Captura 13
Es mostra l'arbre de dependències de `aaron.target`. S'hi veu `aaron.service` com una de les seves unitats i també `multi-user.target`, juntament amb altres serveis. Això permet comprovar visualment la composició del target configurat.
![13](imatges/13.png)

### Captura 14
S'escriu l'ordre `sudo systemctl list-dependencies aaron.service`, que demana llistar les dependències del servei. La captura acaba abans de mostrar-ne la sortida, de manera que no se'n pot confirmar el resultat. Aquesta consulta està relacionada amb l'arbre de dependències de la captura 12.
![14](imatges/14.png)

## Conclusió
S'ha preparat un script que registra informació en un fitxer de registre i s'ha configurat com un servei `systemd` associat a un target personalitzat. També s'ha habilitat el servei, s'ha establert `aaron.target` com a predeterminat i se n'han consultat l'estat i les dependències.
