import React from 'react';
import { Container, Grid, Typography, Accordion, AccordionSummary, AccordionDetails, Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(4)
  },
  accordion: {
    marginBottom: theme.spacing(2)
  },
  paper: {
    backgroundColor: 'WindowFrame',
    borderRadius: theme.spacing(1)
  }
}));

const DocumentationAPI = () => {
  const classes = useStyles();
  const apiData = [
    {
      title: 'Demande de recharge de crédit',
      endpoint: '/solde/recharge',
      method: 'POST',
      description: 'Permet à un utilisateur de faire une demande de recharge de son crédit.',
      note: '',
      parameters: [
        { name: 'userId', type: 'chaîne', location: 'URL', description: "L'ID de l'utilisateur." },
        //{ name: 'ip', type: 'chaîne', location: 'BODY', description: "L'adresse IP de l'utilisateur." },
        { name: 'somme', type: 'nombre', location: 'BODY', description: 'Le montant de crédit à recharger.' }
      ],
      response: [
        { code: '200 OK', description: 'La demande de crédit a été envoyée.' },
        { code: '403 Forbidden', description: 'Adresse IP non autorisée ou bloquée.' },
        { code: '404 Not Found', description: "L'utilisateur n'existe pas." },
        { code: '500 Internal Server Error', description: "Une erreur s'est produite lors du traitement de la demande de recharge." }
      ]
    },

    {
      title: 'Transfert de crédit',
      endpoint: '/solde/transfert',
      method: 'POST',
      description: 'Permet à un utilisateur de faire un transfert de crédit.',
      note: '',
      parameters: [
        { name: 'userId', type: 'chaîne', location: 'URL', description: "L'ID de l'utilisateur." },
        //{ name: 'ip', type: 'chaîne', location: 'BODY', description: "L'adresse IP de l'utilisateur." },
        { name: 'numero', type: 'chaîne', location: 'BODY', description: 'Le numéro du destinataire.' },
        { name: 'somme', type: 'nombre', location: 'BODY', description: 'Le montant de crédit à transférer.' }
      ],
      response: [
        { code: '200 OK', description: 'Transfert de crédit effectué avec succès.' },
        { code: '400 Bad Request', description: 'Solde insuffisant.' },
        { code: '403 Forbidden', description: 'Adresse IP non autorisée ou bloquée.' },
        { code: '404 Not Found', description: 'Utilisateur non trouvé.' },
        { code: '500 Internal Server Error', description: 'Une erreur est survenue lors du transfert de credit.' }
      ]
    },

    {
      title: 'Consultation de solde',
      endpoint: '/solde',
      method: 'GET',
      description: 'Permet à un utilisateur de consulter son solde.',
      note: '',
      parameters: [
        { name: 'userId', type: 'chaîne', location: 'URL', description: "L'ID de l'utilisateur." }
        //{ name: 'ip', type: 'chaîne', location: 'BODY', description: "L'adresse IP de l'utilisateur." }
      ],
      response: [
        { code: '200 OK', description: 'Le solde est envoyé (Résultat en Euro).' },
        { code: '404 Not Found', description: 'Utilisateur non trouvé.' },
        { code: '500 Internal Server Error', description: "Une erreur est survenue lors de la récupération du solde de l'utilisateur." },
        { code: '403 Forbidden', description: 'Adresse IP non autorisée ou bloquée.' },
        { code: '404 Not Found', description: 'Utilisateur non trouvé.' },
        { code: '500 Internal Server Error', description: "Une erreur est survenue lors du transfert de l'offre." }
      ]
    },

    {
      title: "Transfert d'offre",
      endpoint: '/offre/transfert',
      method: 'POST',
      description: "Permet à un utilisateur de faire le transfert d'une offre.",
      note: "La liste des offres se trouve dans l'onglet 'Transférer offres' avec l'operateur et le pays correspondant.",
      parameters: [
        { name: 'userId', type: 'chaîne', location: 'URL', description: "L'ID de l'utilisateur." },
        // { name: 'ip', type: 'chaîne', location: 'BODY', description: "L'adresse IP de l'utilisateur." },
        { name: 'numero', type: 'chaîne', location: 'BODY', description: 'Le numéro du destinataire.' },
        { name: 'pays', type: 'chaîne', location: 'BODY', description: "Le pays de l'opérateur." },
        { name: 'opérateur', type: 'chaîne', location: 'BODY', description: "Le nom de l'opérateur." },
        { name: 'offre', type: 'chaîne', location: 'BODY', description: "L'offre à transférer." }
      ],
      response: [
        { code: '200 OK', description: "Transfert de l'offre effectué avec succès." },
        { code: '400 Bad Request', description: 'Solde insuffisant.'},
        { code: '401 Unauthorized', description: 'Offre inexistant/ Solde insuffisant pour cette offre.' },
        { code: '403 Forbidden', description: 'Adresse IP non autorisée ou bloquée.' },
        { code: '404 Not Found', description: 'Utilisateur non trouvé.' },
        { code: '500 Internal Server Error', description: "Une erreur est survenue lors du transfert de l'offre." }
      ]
    }
  ];
  const baseUrl = 'http://api.jupiter-data.fr';
  const apiKey = 'VOTRE_CLE_API';
  return (
    <Container className={classes.container}>
      <Typography variant="caption">
        Toutes Adresse Ip Doit être incluent dans votre liste d&apos;IP autorisées pour faire des requête, autrement la requête vas être
        interdite
      </Typography>
      <Grid container spacing={1}>
        {apiData.map((api, index) => (
          <Grid item xs={12} key={index}>
            <Accordion className={classes.accordion}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h5">{api.title}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body1">
                  <strong>Endpoint :</strong>
                  {baseUrl}
                  {api.endpoint}
                  <br />
                  <strong>Méthode :</strong> {api.method}
                  <br />
                  <strong>Description :</strong> {api.description}
                  <br />
                  <br />
                  <strong>Paramètres du corps de la requête :</strong>
                  <ul>
                    {api.parameters.map((parameter, index) => (
                      <li key={index}>
                        <strong>{parameter.name}</strong> ({parameter.type}, {parameter.location}) : {parameter.description}
                      </li>
                    ))}
                  </ul>
                  <br />
                  <strong>Réponse :</strong>
                  <ul>
                    {api.response.map((response, index) => (
                      <li key={index}>
                        <strong>{response.code}</strong> : {response.description}
                      </li>
                    ))}
                  </ul>
                  {api.note !== '' && (
                    <>
                      {' '}
                      <br />
                      <strong>Note :</strong> {api.note}
                    </>
                  )}
                </Typography>
              </AccordionDetails>
              <AccordionDetails>
                <Typography variant="body1">
                  <strong>Requête curl :</strong>
                  <Paper className={classes.paper}>
                    <code className="language-bash" style={{ color: 'white' }}>
                      {`curl -X ${api.method} ${baseUrl}${api.endpoint}${api.parameters
                        .filter((param) => param.location === 'URL')
                        .map((param) => `/${param.name}`)
                        .join('')} \\\n`}
                      {api.method === 'POST' ? '  -H "Content-Type: application/json" \\\n' : ''}
                      {/* Include the API key in the curl request */}
                      {apiKey ? `  -H "x-api-key: ${apiKey}" \\\n` : ''}
                      {api.method === 'POST'
                        ? `-d '{${api.parameters
                            .filter((param) => param.location === 'BODY')
                            .map((param) => `"${param.name}": ${param.type === 'nombre' ? param.name : `"${param.name}"`}`)
                            .join(', ')}}' \\\n`
                        : ''}
                    </code>
                  </Paper>
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default DocumentationAPI;
