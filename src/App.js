import { useState } from 'react';
import { Card, CardContent } from "./components/ui/card";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./components/ui/tabs";
import { Table, TableHead, TableHeader, TableRow, TableCell, TableBody } from "./components/ui/table";

export default function FantasyApp() {
  const [team, setTeam] = useState([]);
  const [playerName, setPlayerName] = useState("");
  const [playerStats, setPlayerStats] = useState({ pts: '', reb: '', ast: '', stl: '', blk: '', tov: '' });
  const [players, setPlayers] = useState([]);

  const calculateFantasyPoints = (stats) => {
    return (
      parseFloat(stats.pts || 0) +
      parseFloat(stats.reb || 0) * 1.2 +
      parseFloat(stats.ast || 0) * 1.5 +
      parseFloat(stats.stl || 0) * 3 +
      parseFloat(stats.blk || 0) * 3 -
      parseFloat(stats.tov || 0)
    ).toFixed(2);
  };

  const addPlayer = () => {
    if (!playerName) return;
    const fantasyPoints = calculateFantasyPoints(playerStats);
    setPlayers([...players, { name: playerName, ...playerStats, fantasyPoints }]);
    setPlayerName("");
    setPlayerStats({ pts: '', reb: '', ast: '', stl: '', blk: '', tov: '' });
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🏀 Lebanese Fantasy Basketball (Prototype)</h1>
      <Tabs defaultValue="team">
        <TabsList>
          <TabsTrigger value="team">Pick Team</TabsTrigger>
          <TabsTrigger value="admin">Admin: Enter Stats</TabsTrigger>
        </TabsList>
        <TabsContent value="team">
          <Card className="mt-4">
            <CardContent className="space-y-4">
              <h2 className="text-xl font-semibold">My Fantasy Team</h2>
              <ul className="list-disc ml-6">
                {team.map((p, idx) => <li key={idx}>{p}</li>)}
              </ul>
              <Input placeholder="Player name" onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  setTeam([...team, e.target.value]);
                  e.target.value = '';
                }
              }} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="admin">
          <Card className="mt-4">
            <CardContent className="space-y-4">
              <h2 className="text-xl font-semibold">Admin Panel</h2>
              <Input placeholder="Player Name" value={playerName} onChange={e => setPlayerName(e.target.value)} />
              <div className="grid grid-cols-3 gap-2">
                {['pts', 'reb', 'ast', 'stl', 'blk', 'tov'].map(stat => (
                  <Input
                    key={stat}
                    type="number"
                    placeholder={stat.toUpperCase()}
                    value={playerStats[stat]}
                    onChange={e => setPlayerStats(prev => ({ ...prev, [stat]: e.target.value }))}
                  />
                ))}
              </div>
              <Button onClick={addPlayer}>Add Player</Button>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>PTS</TableHead>
                    <TableHead>REB</TableHead>
                    <TableHead>AST</TableHead>
                    <TableHead>STL</TableHead>
                    <TableHead>BLK</TableHead>
                    <TableHead>TOV</TableHead>
                    <TableHead>Fantasy Pts</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {players.map((p, i) => (
                    <TableRow key={i}>
                      <TableCell>{p.name}</TableCell>
                      <TableCell>{p.pts}</TableCell>
                      <TableCell>{p.reb}</TableCell>
                      <TableCell>{p.ast}</TableCell>
                      <TableCell>{p.stl}</TableCell>
                      <TableCell>{p.blk}</TableCell>
                      <TableCell>{p.tov}</TableCell>
                      <TableCell>{p.fantasyPoints}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}