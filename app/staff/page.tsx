'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import { modeIcon as modeLabel } from '@/lib/mapProjection';
import styles from './staff.module.scss';

type Shipment = {
  id: string;
  tracking_number: string;
  status: string;
  mode: string;
  current_city: string;
  current_lat: number;
  current_lng: number;
  eta: string;
};

const STATUS_KEYS = ['all', 'in_transit', 'pending', 'delayed', 'delivered'] as const;
type StatusKey = (typeof STATUS_KEYS)[number];

const statusMeta: Record<string, { label: string; color: string; bg: string; dot: string }> = {
  in_transit: { label: 'In Transit', color: '#93c5fd', bg: 'rgba(59, 130, 246, 0.12)', dot: '#3b82f6' },
  delivered: { label: 'Delivered', color: '#86efac', bg: 'rgba(34, 197, 94, 0.12)', dot: '#22c55e' },
  delayed: { label: 'Delayed', color: '#fdba74', bg: 'rgba(245, 158, 11, 0.12)', dot: '#f59e0b' },
  pending: { label: 'Pending', color: '#cbd5e1', bg: 'rgba(100, 116, 139, 0.12)', dot: '#64748b' },
};

function getStatusMeta(status: string) {
  return statusMeta[status] || statusMeta.pending;
}

function statusLabel(key: StatusKey) {
  if (key === 'all') return 'All';
  return getStatusMeta(key).label;
}

function formatEta(eta?: string) {
  if (!eta) return '—';
  const d = new Date(eta);
  return Number.isNaN(d.getTime()) ? eta : d.toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' });
}

function fmtCoord(n: number) {
  return Number.isFinite(n) ? n.toFixed(4) : '—';
}

function Svg({ children, ...props }: { children: React.ReactNode } & React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...props}>
      {children}
    </svg>
  );
}

function SearchIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <Svg {...props}>
      <circle cx="11" cy="11" r="8" />
      <path d="M21 21l-4.35-4.35" />
    </Svg>
  );
}

function RefreshIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <Svg {...props}>
      <path d="M23 4v6h-6M1 20v-6h6M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
    </Svg>
  );
}

function ShieldIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <Svg {...props}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </Svg>
  );
}

function PackageIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <Svg {...props}>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18M12 3v18" />
    </Svg>
  );
}

function PlaneIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <Svg {...props}>
      <path d="M2 12h20M15 2l7 10-7 10" />
    </Svg>
  );
}

function ShipIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <Svg {...props}>
      <path d="M3 17h18l-2-7H5l-2 7zM7 10V6h10v4M12 3v3" />
    </Svg>
  );
}

function TruckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <Svg {...props}>
      <path d="M10 17h4M17 17h2a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-2V5H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h2" />
      <circle cx="7" cy="17" r="2" />
      <circle cx="17" cy="17" r="2" />
    </Svg>
  );
}

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="10" />
      <path d="M8 12l3 3 5-6" />
    </Svg>
  );
}

function RouteIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <Svg {...props}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </Svg>
  );
}

function LayersIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <Svg {...props}>
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
    </Svg>
  );
}

function AlertIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <Svg {...props}>
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </Svg>
  );
}

function EditIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <Svg {...props}>
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </Svg>
  );
}

function PhoneIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <Svg {...props}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.8 12.8 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.8 12.8 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </Svg>
  );
}

function LogoutIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <Svg {...props}>
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
    </Svg>
  );
}

function ModeIcon({ mode, ...props }: { mode: string } & React.SVGProps<SVGSVGElement>) {
  const lower = mode?.toLowerCase() ?? '';
  if (lower === 'air') return <PlaneIcon {...props} />;
  if (lower === 'ocean') return <ShipIcon {...props} />;
  if (lower === 'truck') return <TruckIcon {...props} />;
  return <PackageIcon {...props} />;
}

function StatusChip({ status }: { status: string }) {
  const meta = getStatusMeta(status);
  return (
    <span className={styles.statusChip} style={{ background: meta.bg, color: meta.color }}>
      <span className={styles.statusDot} style={{ background: meta.dot, boxShadow: `0 0 8px ${meta.dot}` }} />
      {meta.label}
    </span>
  );
}

function ModeBadge({ mode }: { mode: string }) {
  const { label } = modeLabel(mode);
  return (
    <span className={styles.modeBadge}>
      <ModeIcon mode={mode} width={15} height={15} />
      {label}
    </span>
  );
}

function Skeleton() {
  return (
    <div className={styles.loadingGrid} aria-busy="true" aria-live="polite">
      <div className={styles.skeleton} />
      <div className={styles.skeleton} />
      <div className={styles.skeleton} />
      <div className={styles.skeleton} />
    </div>
  );
}

export default function StaffDashboard() {
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ current_city: '', current_lat: '', current_lng: '', status: '' });
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusKey>('all');
  const [refreshing, setRefreshing] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const router = useRouter();

  const loadShipments = async () => {
    try {
      const res = await fetch('/api/staff/shipments');
      if (!res.ok) throw new Error('Unauthorized');
      const data = await res.json();
      setShipments(data.shipments || []);
    } catch (err) {
      console.error('Failed to load shipments:', err);
      setShipments([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadShipments();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadShipments();
    setRefreshing(false);
  };

  const handleLogout = async () => {
    setLoggingOut(true);
    await fetch('/api/staff/logout', { method: 'POST' });
    setLoggingOut(false);
    router.push('/staff/login');
    router.refresh();
  };

  const startEdit = (shipment: Shipment) => {
    setEditingId(shipment.id);
    setForm({
      current_city: shipment.current_city,
      current_lat: String(shipment.current_lat),
      current_lng: String(shipment.current_lng),
      status: shipment.status,
    });
  };

  const saveEdit = async (id: string) => {
    setSaving(true);
    await fetch(`/api/staff/shipments/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        current_city: form.current_city,
        current_lat: parseFloat(form.current_lat),
        current_lng: parseFloat(form.current_lng),
        status: form.status,
      }),
    });
    setSaving(false);
    setEditingId(null);
    loadShipments();
  };

  const stats = useMemo(() => {
    const total = shipments.length;
    const inTransit = shipments.filter((s) => s.status === 'in_transit').length;
    const delivered = shipments.filter((s) => s.status === 'delivered').length;
    const exceptions = shipments.filter((s) => s.status === 'delayed' || s.status === 'pending').length;
    return [
      { icon: LayersIcon, value: total, label: 'Total Shipments', color: '#fff' },
      { icon: RouteIcon, value: inTransit, label: 'In Transit', color: '#60a5fa' },
      { icon: CheckIcon, value: delivered, label: 'Delivered', color: '#4ade80' },
      { icon: AlertIcon, value: exceptions, label: 'Attention', color: '#f59e0b' },
    ];
  }, [shipments]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return shipments.filter((s) => {
      const matchesStatus = statusFilter === 'all' || s.status === statusFilter;
      if (!matchesStatus) return false;
      if (!q) return true;
      const hay = `${s.tracking_number} ${s.current_city} ${s.mode} ${s.status}`.toLowerCase();
      return hay.includes(q);
    });
  }, [shipments, search, statusFilter]);

  return (
    <>
      <Navbar />
      <div className={styles.page}>
        <section className={styles.hero}>
          <div className={styles.gridBg} aria-hidden="true" />
          <div className={`${styles.glowOrange} glow-orb`} aria-hidden="true" />
          <div className={`${styles.glowBlue} glow-orb`} aria-hidden="true" />
          <div className={styles.container}>
            <motion.div
              className={styles.heroHeader}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className={styles.heroInner}>
                <motion.span className={styles.eyebrow} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
                  <ShieldIcon width={14} height={14} /> Operations Center
                </motion.span>
                <motion.h1
                  className={styles.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.15 }}
                >
                  <span className={styles.gradient}>Shipment Command Center</span>
                </motion.h1>
                <motion.p
                  className={styles.subtitle}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.3 }}
                >
                  Manage live freight locations, statuses, and ETAs in one place. Updates sync across the network instantly.
                </motion.p>
                <motion.div
                  className={styles.ctaRow}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.45 }}
                >
                  <button className={styles.primaryBtn} onClick={onRefresh} disabled={refreshing}>
                    <RefreshIcon width={16} height={16} />
                    {refreshing ? 'Refreshing…' : 'Refresh network'}
                  </button>
                  <Link href="/contact" className={styles.secondaryBtn}>
                    Support team
                  </Link>
                </motion.div>
              </div>

              <motion.button
                className={styles.logoutBtn}
                onClick={handleLogout}
                disabled={loggingOut}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.35 }}
                aria-label="Log out"
              >
                <LogoutIcon width={16} height={16} />
                <span className={styles.logoutText}>{loggingOut ? 'Logging out…' : 'Logout'}</span>
              </motion.button>
            </motion.div>
          </div>
        </section>

        <main className={styles.main}>
          <div className={styles.container}>
            <motion.div
              className={styles.stats}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55 }}
            >
              {stats.map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    className={styles.stat}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 + i * 0.08 }}
                  >
                    <span className={styles.statIcon} style={{ color: stat.color }}>
                      <Icon width={22} height={22} />
                    </span>
                    <div>
                      <div className={styles.statValue}>{stat.value}</div>
                      <div className={styles.statLabel}>{stat.label}</div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            <div className={styles.toolbar}>
              <div className={styles.tabs}>
                {STATUS_KEYS.map((key) => (
                  <button
                    key={key}
                    className={statusFilter === key ? styles.tabActive : styles.tab}
                    onClick={() => setStatusFilter(key)}
                  >
                    {statusLabel(key)}
                  </button>
                ))}
              </div>
              <div className={styles.search}>
                <SearchIcon className={styles.searchIcon} width={18} height={18} />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search tracking, city, or mode…"
                  className={styles.searchInput}
                />
              </div>
            </div>

            <div className={styles.listHeader}>
              <h2 className={styles.listTitle}>Live Shipments</h2>
              <span className={styles.listCount}>
                {loading ? 'Loading…' : `${filtered.length} result${filtered.length === 1 ? '' : 's'}`}
              </span>
            </div>

            {loading ? (
              <Skeleton />
            ) : filtered.length === 0 ? (
              <motion.div
                className={styles.empty}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
              >
                <PackageIcon width={48} height={48} />
                <h3>No shipments found</h3>
                <p>Try adjusting your search or filter to find what you&apos;re looking for.</p>
              </motion.div>
            ) : (
              <motion.div className={styles.shipmentList} layout>
                <AnimatePresence mode="popLayout">
                  {filtered.map((s, i) => (
                    <motion.div
                      key={s.id}
                      className={styles.shipmentCard}
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.35, delay: Math.min(i * 0.04, 0.4) }}
                      layout
                    >
                      <div className={styles.cardHeader}>
                        <div className={styles.cardMeta}>
                          <span className={styles.tracking}>{s.tracking_number}</span>
                          <ModeBadge mode={s.mode} />
                        </div>
                        <div className={styles.actions}>
                          <StatusChip status={s.status} />
                          {editingId !== s.id && (
                            <button
                              className={styles.iconBtn}
                              onClick={() => startEdit(s)}
                              aria-label={`Edit shipment ${s.tracking_number}`}
                            >
                              <EditIcon width={16} height={16} />
                            </button>
                          )}
                        </div>
                      </div>

                      {editingId === s.id ? (
                        <div className={styles.editForm}>
                          <input
                            value={form.current_city}
                            onChange={(e) => setForm({ ...form, current_city: e.target.value })}
                            placeholder="Current city"
                          />
                          <input
                            value={form.current_lat}
                            onChange={(e) => setForm({ ...form, current_lat: e.target.value })}
                            placeholder="Latitude"
                            inputMode="decimal"
                          />
                          <input
                            value={form.current_lng}
                            onChange={(e) => setForm({ ...form, current_lng: e.target.value })}
                            placeholder="Longitude"
                            inputMode="decimal"
                          />
                          <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
                            <option value="in_transit">In Transit</option>
                            <option value="delivered">Delivered</option>
                            <option value="delayed">Delayed</option>
                            <option value="pending">Pending</option>
                          </select>
                          <div className={styles.formActions}>
                            <button className={styles.saveBtn} onClick={() => saveEdit(s.id)} disabled={saving}>
                              {saving ? 'Saving…' : 'Save update'}
                            </button>
                            <button className={styles.cancelBtn} onClick={() => setEditingId(null)}>
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className={styles.cardBody}>
                          <div className={styles.cell}>
                            <span className={styles.cellLabel}>Mode</span>
                            <span className={styles.cellValue}>
                              <ModeIcon mode={s.mode} width={14} height={14} style={{ verticalAlign: '-2px', marginRight: 6 }} />
                              {modeLabel(s.mode).label}
                            </span>
                          </div>
                          <div className={styles.cell}>
                            <span className={styles.cellLabel}>Current City</span>
                            <span className={styles.cellValue}>{s.current_city || '—'}</span>
                          </div>
                          <div className={styles.cell}>
                            <span className={styles.cellLabel}>Coordinates</span>
                            <span className={styles.cellValue}>
                              {fmtCoord(s.current_lat)}, {fmtCoord(s.current_lng)}
                            </span>
                          </div>
                          <div className={styles.cell}>
                            <span className={styles.cellLabel}>Estimated Arrival</span>
                            <span className={styles.cellValue}>{formatEta(s.eta)}</span>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}

            <section className={styles.cta}>
              <motion.div
                className={styles.ctaCard}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6 }}
              >
                <div>
                  <h2 className={styles.ctaTitle}>Need operational support?</h2>
                  <p className={styles.ctaCopy}>
                    Our operations team is available around the clock to resolve exceptions, reroute cargo, and answer questions.
                  </p>
                </div>
                <div className={styles.ctaActions}>
                  <a href="mailto:ops@unitedcarriers.com" className={styles.primaryBtn}>
                    <PhoneIcon width={16} height={16} />
                    Email operations
                  </a>
                  <Link href="/contact" className={styles.secondaryBtn}>
                    Contact page
                  </Link>
                </div>
              </motion.div>
            </section>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}
